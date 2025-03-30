
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Company } from '@/types';
import { CompaniesTable } from './CompaniesTable';
import { CompanyFilters } from './CompanyFilters';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVerificationStatus } from '@/services/company/verificationService';
import { verifyOpReturn } from '@/services/bitcoinService';
import { getTransactionDetails } from '@/services/bitcoinService';

type CompanyVerifierProps = {
  companies: Company[];
};

export const CompanyVerifier = ({ companies }: CompanyVerifierProps) => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
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

  return (
    <>
      <CompanyFilters 
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <CompaniesTable 
        companies={filteredCompanies}
        isPending={verificationMutation.isPending}
        onVerifyTransaction={verifyTransaction}
        onVerificationUpdate={handleVerificationUpdate}
      />
    </>
  );
};
