
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CheckCircle, Globe, ExternalLink, Copy, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

// This is a mock company - in a real app this would come from your API
const mockCompany = {
  id: '123',
  name: 'Acme Corporation',
  registrationNumber: '12345678',
  country: 'NL',
  website: 'https://acmecorp.example.com',
  description: 'A leading provider of innovative solutions for businesses worldwide.',
  bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  verificationStatus: 'verified',
  transactionId: '6a95d3f2a50c4c9addd6311d45af13ba10bca8e9f4afa2e3bb63bf8d1c611d14',
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-02'),
};

const CompanyPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  
  // In a real app, we would fetch the company data based on the ID
  const company = mockCompany;
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(company.bitcoinAddress);
    toast.success('Bitcoin address copied to clipboard');
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
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1 mb-4 rounded-full bg-green-100 text-green-800">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Verified Business</span>
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
                <div className="p-4 rounded-lg bg-green-50 border border-green-100 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-green-800">Verified on Bitcoin Blockchain</div>
                    <div className="text-sm text-green-700">
                      Last verified on {new Date(company.updatedAt).toLocaleDateString()}
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
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Blockchain Proof</label>
                    <div className="mt-1">
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <a href={`https://mempool.space/tx/${company.transactionId}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Transaction on Blockchain Explorer
                        </a>
                      </Button>
                    </div>
                  </div>
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
