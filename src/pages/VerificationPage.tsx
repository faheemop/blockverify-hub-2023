
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Copy, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Step1Form } from '@/components/verification/Step1Form';
import { Step2QR } from '@/components/verification/Step2QR';
import { Step3Submit } from '@/components/verification/Step3Submit';
import { VerificationFormData } from '@/types';

type VerificationStep = 'step1' | 'step2' | 'step3';

const VerificationPage = () => {
  const [activeStep, setActiveStep] = useState<VerificationStep>('step1');
  const [formData, setFormData] = useState<VerificationFormData>({
    name: '',
    registrationNumber: '',
    country: '',
    website: '',
    description: '',
  });
  const [bitcoinAddress, setBitcoinAddress] = useState<string>('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');
  const [opReturnData, setOpReturnData] = useState<string>('');
  const [txId, setTxId] = useState<string>('');
  
  const handleFormSubmit = (data: VerificationFormData) => {
    setFormData(data);
    
    // Generate a company slug from the name (lowercase, no spaces, no special chars)
    const companySlug = data.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Set the OP_RETURN data to include the country, registration number and blockst.one URL
    setOpReturnData(`${data.country}#${data.registrationNumber} blockst.one/${companySlug}`);
    
    // In a real app, we'd call an API to generate a Bitcoin address here
    setActiveStep('step2');
    toast.success('Business details saved, proceed to make payment');
  };
  
  const handlePaymentConfirmation = () => {
    setActiveStep('step3');
  };
  
  const handleTxIdSubmit = (txId: string) => {
    setTxId(txId);
    toast.success('Transaction ID submitted successfully');
    // In a real app, we'd submit this to our backend
    window.setTimeout(() => {
      toast('Your verification request has been received and is pending review.', {
        description: 'We will notify you once verified.',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
    }, 1500);
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
                <Step1Form onSubmit={handleFormSubmit} />
              </TabsContent>
              
              <TabsContent value="step2" className="m-0">
                <Step2QR 
                  bitcoinAddress={bitcoinAddress} 
                  opReturnData={opReturnData}
                  onProceed={handlePaymentConfirmation}
                />
              </TabsContent>
              
              <TabsContent value="step3" className="m-0">
                <Step3Submit onSubmit={handleTxIdSubmit} />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default VerificationPage;
