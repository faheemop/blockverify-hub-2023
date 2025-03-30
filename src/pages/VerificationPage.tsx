import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Step1Form } from '@/components/verification/Step1Form';
import { Step2QR } from '@/components/verification/Step2QR';
import { Step3Submit } from '@/components/verification/Step3Submit';
import { VerificationFormData } from '@/types';
import { submitVerification, submitTransactionId } from '@/services/company';

type VerificationStep = 'step1' | 'step2' | 'step3';

const VerificationPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<VerificationStep>('step1');
  const [formData, setFormData] = useState<VerificationFormData>({
    name: '',
    registrationNumber: '',
    country: '',
    website: '',
    description: '',
  });
  const [bitcoinAddress, setBitcoinAddress] = useState<string>('');
  const [opReturnData, setOpReturnData] = useState<string>('');
  const [companyId, setCompanyId] = useState<string>('');
  
  const verificationMutation = useMutation({
    mutationFn: submitVerification,
    onSuccess: (data) => {
      setCompanyId(data.id);
      setBitcoinAddress(data.bitcoinAddress || '');
      
      const companySlug = data.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      setOpReturnData(`${data.country}#${data.registrationNumber} blockst.one/${companySlug}`);
      
      setActiveStep('step2');
      toast.success('Business details saved, proceed to make payment');
    },
    onError: (error) => {
      toast.error('Failed to submit verification', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  });
  
  const txIdMutation = useMutation({
    mutationFn: (txId: string) => submitTransactionId(companyId, txId),
    onSuccess: (data) => {
      toast.success('Transaction ID submitted successfully');
    },
    onError: (error) => {
      toast.error('Failed to submit transaction ID', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  });
  
  const handleFormSubmit = (data: VerificationFormData) => {
    setFormData(data);
    verificationMutation.mutate(data);
  };
  
  const handlePaymentConfirmation = () => {
    setActiveStep('step2');
  };
  
  const handleTxIdSubmit = (txId: string) => {
    txIdMutation.mutate(txId);
  };
  
  return (
    <MainLayout>
      <div className="container px-4 mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Business Verification Process</h1>
            <p className="text-muted-foreground">
              Complete these steps to verify your business on the Bitcoin blockchain
            </p>
          </div>
          
          <Tabs defaultValue={activeStep} value={activeStep} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger 
                value="step1" 
                disabled={activeStep !== 'step1'} 
                onClick={() => activeStep !== 'step1' && setActiveStep('step1')}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                1. Business Details
              </TabsTrigger>
              <TabsTrigger 
                value="step2" 
                disabled={activeStep === 'step1'}
                onClick={() => activeStep !== 'step2' && activeStep !== 'step1' && setActiveStep('step2')}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                2. Bitcoin Payment
              </TabsTrigger>
              <TabsTrigger 
                value="step3" 
                disabled={activeStep === 'step1' || activeStep === 'step2'}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                3. Submit Proof
              </TabsTrigger>
            </TabsList>
            
            <div className="bg-card rounded-lg border shadow-card overflow-hidden">
              <TabsContent value="step1" className="m-0">
                <Step1Form onSubmit={handleFormSubmit} isLoading={verificationMutation.isPending} />
              </TabsContent>
              
              <TabsContent value="step2" className="m-0">
                <Step2QR 
                  bitcoinAddress={bitcoinAddress} 
                  opReturnData={opReturnData}
                  onProceed={handlePaymentConfirmation}
                />
              </TabsContent>
              
              <TabsContent value="step3" className="m-0">
                <Step3Submit 
                  onSubmit={handleTxIdSubmit} 
                  isLoading={txIdMutation.isPending} 
                  opReturnData={opReturnData} 
                />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default VerificationPage;
