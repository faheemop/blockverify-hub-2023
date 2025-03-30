import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CheckCircle, Globe, ExternalLink, Copy, ShieldCheck, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { getCompanyById } from '@/services/company/companyQueryService';
import { Skeleton } from '@/components/ui/skeleton';

const CompanyPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  
  // Fetch company data
  const { data: company, isLoading, error } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => companyId ? getCompanyById(companyId) : null,
    enabled: !!companyId,
  });
  
  const handleCopyAddress = () => {
    if (company?.bitcoinAddress) {
      navigator.clipboard.writeText(company.bitcoinAddress);
      toast.success('Bitcoin address copied to clipboard');
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container px-4 mx-auto py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <Skeleton className="h-8 w-48 mx-auto mb-4" />
              <Skeleton className="h-12 w-3/4 mx-auto mb-2" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-72 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (error || !company) {
    return (
      <MainLayout>
        <div className="container px-4 mx-auto py-12">
          <div className="max-w-3xl mx-auto text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-orange-500 mb-4" />
            <h1 className="text-3xl font-bold mb-4">Company Not Found</h1>
            <p className="text-muted-foreground mb-8">
              We couldn't find the company you're looking for. It may have been removed or the ID is incorrect.
            </p>
            <Button onClick={() => navigate('/')}>
              Return to Home
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container px-4 mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1 mb-4 rounded-full bg-green-100 text-green-800">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">
                {company.verificationStatus === 'verified' 
                  ? 'Verified Business' 
                  : company.verificationStatus === 'pending' 
                    ? 'Pending Verification' 
                    : 'Verification Rejected'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{company.name}</h1>
            <p className="text-muted-foreground text-lg">
              Registration: {company.country}#{company.registrationNumber}
            </p>
          </div>
          
          <div className="grid gap-6">
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5 text-green-500" />
                  Verification Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  company.verificationStatus === 'verified' 
                    ? 'bg-green-50 border border-green-100' 
                    : company.verificationStatus === 'pending'
                      ? 'bg-yellow-50 border border-yellow-100'
                      : 'bg-red-50 border border-red-100'
                } flex items-center`}>
                  <div className={`w-12 h-12 rounded-full ${
                    company.verificationStatus === 'verified' 
                      ? 'bg-green-100' 
                      : company.verificationStatus === 'pending'
                        ? 'bg-yellow-100'
                        : 'bg-red-100'
                  } flex items-center justify-center mr-4`}>
                    {company.verificationStatus === 'verified' ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : company.verificationStatus === 'pending' ? (
                      <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className={`font-medium ${
                      company.verificationStatus === 'verified' 
                        ? 'text-green-800' 
                        : company.verificationStatus === 'pending'
                          ? 'text-yellow-800'
                          : 'text-red-800'
                    }`}>
                      {company.verificationStatus === 'verified' 
                        ? 'Verified on Bitcoin Blockchain' 
                        : company.verificationStatus === 'pending'
                          ? 'Verification Pending'
                          : 'Verification Rejected'}
                    </div>
                    <div className={`text-sm ${
                      company.verificationStatus === 'verified' 
                        ? 'text-green-700' 
                        : company.verificationStatus === 'pending'
                          ? 'text-yellow-700'
                          : 'text-red-700'
                    }`}>
                      Last updated on {company.updatedAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Verified Bitcoin Address</label>
                    <div className="flex items-center mt-1">
                      <code className="flex-1 p-2 bg-secondary rounded text-sm overflow-x-auto">
                        {company.bitcoinAddress}
                      </code>
                      <Button variant="ghost" size="sm" onClick={handleCopyAddress} className="ml-2">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {company.transactionId && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Blockchain Proof</label>
                      <div className="mt-1">
                        <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                          <a 
                            href={`https://mempool.space/tx/${company.transactionId}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Transaction on Blockchain Explorer
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {company.description && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <p className="mt-1">{company.description}</p>
                  </div>
                )}
                
                {company.website && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Website</label>
                    <div className="mt-1">
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <a href={company.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          {company.website}
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default CompanyPage;
