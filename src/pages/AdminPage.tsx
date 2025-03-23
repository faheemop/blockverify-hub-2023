
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Search, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getAllCompanies, updateVerificationStatus } from '@/services/companyService';
import { getTransactionDetails, verifyOpReturn } from '@/services/bitcoinService';
import { Company } from '@/types';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

const AdminPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch all companies
  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: getAllCompanies,
  });
  
  // Update verification status mutation
  const verificationMutation = useMutation({
    mutationFn: ({ companyId, status }: { companyId: string, status: 'pending' | 'verified' | 'rejected' }) => 
      updateVerificationStatus(companyId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Verification status updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update verification status', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  });
  
  // Filter and search companies
  const filteredCompanies = React.useMemo(() => {
    if (!companies) return [];
    
    return companies
      .filter(company => {
        if (filter === 'all') return true;
        return company.verificationStatus === filter;
      })
      .filter(company => {
        if (!searchTerm) return true;
        
        const search = searchTerm.toLowerCase();
        return (
          company.name.toLowerCase().includes(search) ||
          company.registrationNumber.toLowerCase().includes(search) ||
          company.country.toLowerCase().includes(search)
        );
      });
  }, [companies, filter, searchTerm]);
  
  // Handle verification status update
  const handleVerificationUpdate = (companyId: string, status: 'verified' | 'rejected') => {
    verificationMutation.mutate({ companyId, status });
  };
  
  // Verify transaction on blockchain
  const verifyTransaction = async (company: Company) => {
    if (!company.transactionId) {
      toast.error('No transaction ID available');
      return;
    }
    
    try {
      // Create the expected OP_RETURN data
      const companySlug = company.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const expectedData = `${company.country}#${company.registrationNumber} blockst.one/${companySlug}`;
      
      toast.info('Verifying transaction on blockchain...', {
        id: 'verify-transaction',
      });
      
      // Get the transaction details
      const txDetails = await getTransactionDetails(company.transactionId);
      
      if (!txDetails) {
        toast.error('Transaction not found on blockchain', {
          id: 'verify-transaction',
        });
        return;
      }
      
      // Verify the OP_RETURN data
      const verified = await verifyOpReturn(company.transactionId, expectedData);
      
      if (verified) {
        toast.success('Transaction verified successfully', {
          id: 'verify-transaction',
        });
        handleVerificationUpdate(company.id, 'verified');
      } else {
        toast.error('Transaction verification failed', {
          description: 'OP_RETURN data does not match expected value',
          id: 'verify-transaction',
        });
      }
    } catch (error) {
      toast.error('Failed to verify transaction', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        id: 'verify-transaction',
      });
    }
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Verified</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <Skeleton className="h-10 w-64 mb-2" />
                  <Skeleton className="h-5 w-96" />
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-10 w-64" />
                      <Skeleton className="h-10 w-32" />
                    </div>
                    <Skeleton className="h-80 w-full" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage business verification requests and view transaction details
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">Logged in as</p>
                <p className="text-muted-foreground">{user?.username}</p>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Business Verification Requests</CardTitle>
                <CardDescription>
                  Review and manage business verification requests submitted by users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search by name, registration number..."
                        className="pl-8 w-full sm:w-80"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <Tabs 
                      defaultValue="all" 
                      value={filter} 
                      onValueChange={(value) => setFilter(value as any)}
                      className="w-full sm:w-auto"
                    >
                      <TabsList className="grid grid-cols-4 w-full sm:w-auto">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="verified">Verified</TabsTrigger>
                        <TabsTrigger value="rejected">Rejected</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company Name</TableHead>
                          <TableHead>Registration</TableHead>
                          <TableHead>Date Submitted</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCompanies.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                              No verification requests found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredCompanies.map((company) => (
                            <TableRow key={company.id}>
                              <TableCell className="font-medium">{company.name}</TableCell>
                              <TableCell>{company.country}#{company.registrationNumber}</TableCell>
                              <TableCell>{company.createdAt.toLocaleDateString()}</TableCell>
                              <TableCell>{getStatusBadge(company.verificationStatus)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link to={`/company/${company.id}`}>
                                      View
                                    </Link>
                                  </Button>
                                  
                                  {company.verificationStatus === 'pending' && company.transactionId && (
                                    <>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => verifyTransaction(company)}
                                        disabled={verificationMutation.isPending}
                                      >
                                        {verificationMutation.isPending ? (
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                          'Verify TX'
                                        )}
                                      </Button>
                                      
                                      <Button 
                                        size="sm" 
                                        variant="default" 
                                        onClick={() => handleVerificationUpdate(company.id, 'verified')}
                                        disabled={verificationMutation.isPending}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Approve
                                      </Button>
                                      
                                      <Button 
                                        size="sm" 
                                        variant="destructive" 
                                        onClick={() => handleVerificationUpdate(company.id, 'rejected')}
                                        disabled={verificationMutation.isPending}
                                      >
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                  
                                  {company.transactionId && (
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      asChild
                                    >
                                      <a 
                                        href={`https://mempool.space/tx/${company.transactionId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
