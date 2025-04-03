
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { VerificationStatus } from '@/components/verification/VerificationStatus';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const VerificationStatusPage = () => {
  const { txId } = useParams<{ txId: string }>();
  const [expectedData, setExpectedData] = useState<string>('');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');
  
  useEffect(() => {
    // In a real app, you would fetch this from your backend
    // For now, we'll use a placeholder or get it from localStorage if available
    const storedData = localStorage.getItem('opReturnData');
    setExpectedData(storedData || 'blockst.one');
    
    // Check if we have stored verification status
    const storedStatus = localStorage.getItem(`verification_status_${txId}`);
    if (storedStatus && (storedStatus === 'verified' || storedStatus === 'rejected')) {
      setVerificationStatus(storedStatus as 'verified' | 'rejected');
    }
  }, [txId]);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link to="/verify">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Verification
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Transaction Verification Status</h1>
          </div>
          
          {txId ? (
            <VerificationStatus 
              txId={txId} 
              expectedData={expectedData} 
              initialStatus={verificationStatus}
            />
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-medium mb-4">No Transaction ID Provided</h2>
              <p className="text-muted-foreground mb-8">
                Please go back to the verification page and submit a valid transaction ID.
              </p>
              <Button asChild>
                <Link to="/verify">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go to Verification
                </Link>
              </Button>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default VerificationStatusPage;
