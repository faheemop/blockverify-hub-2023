
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ExternalLink, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Company } from '@/types';

// Mock data for the admin dashboard
const pendingCompanies: Company[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    registrationNumber: '12345678',
    country: 'NL',
    website: 'https://acmecorp.example.com',
    bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    verificationStatus: 'pending',
    transactionId: '6a95d3f2a50c4c9addd6311d45af13ba10bca8e9f4afa2e3bb63bf8d1c611d14',
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date('2023-04-01'),
  },
  {
    id: '2',
    name: 'Globex Industries',
    registrationNumber: '87654321',
    country: 'DE',
    website: 'https://globex.example.com',
    bitcoinAddress: 'bc1q9h0yjczfp3fv2mz29qlxt0maaelxvsghu35xnn',
    verificationStatus: 'pending',
    transactionId: '4f8d3c2b1a0e9f8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3e2d1c0b9a8f7e6d5c4',
    createdAt: new Date('2023-04-02'),
    updatedAt: new Date('2023-04-02'),
  },
];

const verifiedCompanies: Company[] = [
  {
    id: '3',
    name: 'Wayne Enterprises',
    registrationNumber: '55556666',
    country: 'US',
    website: 'https://wayne.example.com',
    bitcoinAddress: 'bc1q8c7e5r3t2y1u0p9o8i7u6y5t4r3e2w1q0p9o8',
    verificationStatus: 'verified',
    transactionId: '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-03-20'),
  },
];

const AdminPage = () => {
  const [companies, setCompanies] = useState({
    pending: pendingCompanies,
    verified: verifiedCompanies,
  });
  
  const handleVerify = (companyId: string) => {
    // In a real app, this would make an API call
    setCompanies(prev => {
      const company = prev.pending.find(c => c.id === companyId);
      if (!company) return prev;
      
      const updatedCompany = { 
        ...company, 
        verificationStatus: 'verified' as const,
        updatedAt: new Date() 
      };
      
      return {
        pending: prev.pending.filter(c => c.id !== companyId),
        verified: [...prev.verified, updatedCompany],
      };
    });
    
    toast.success('Company verified successfully');
  };
  
  const handleReject = (companyId: string) => {
    // In a real app, this would make an API call
    setCompanies(prev => ({
      ...prev,
      pending: prev.pending.filter(c => c.id !== companyId),
    }));
    
    toast.error('Company verification rejected');
  };
  
  return (
    <MainLayout>
      <div className="container px-4 mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage business verification requests and view verified companies
            </p>
          </div>
          
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="pending" className="relative">
                Pending Verification
                {companies.pending.length > 0 && (
                  <Badge variant="destructive" className="ml-2">{companies.pending.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="verified">
                Verified Companies
                {companies.verified.length > 0 && (
                  <Badge variant="outline" className="ml-2">{companies.verified.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Verification Requests</CardTitle>
                  <CardDescription>
                    Review and verify businesses that have submitted their Bitcoin transaction proof
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {companies.pending.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No pending verification requests
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Registration</TableHead>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {companies.pending.map((company) => (
                            <TableRow key={company.id}>
                              <TableCell className="font-medium">{company.name}</TableCell>
                              <TableCell>{company.country}#{company.registrationNumber}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <code className="text-xs truncate max-w-[140px]">
                                    {company.transactionId}
                                  </code>
                                  <a 
                                    href={`https://mempool.space/tx/${company.transactionId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </div>
                              </TableCell>
                              <TableCell>
                                {company.createdAt.toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="default"
                                    onClick={() => handleVerify(company.id)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Verify
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => handleReject(company.id)}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="verified">
              <Card>
                <CardHeader>
                  <CardTitle>Verified Companies</CardTitle>
                  <CardDescription>
                    List of businesses that have successfully completed the verification process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {companies.verified.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No verified companies yet
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Registration</TableHead>
                            <TableHead>Verification Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {companies.verified.map((company) => (
                            <TableRow key={company.id}>
                              <TableCell className="font-medium">{company.name}</TableCell>
                              <TableCell>{company.country}#{company.registrationNumber}</TableCell>
                              <TableCell>
                                {company.updatedAt.toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  asChild
                                >
                                  <Link to={`/company/${company.id}`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
