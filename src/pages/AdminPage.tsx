
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getAllCompanies } from '@/services/companyService';

// Import our refactored components
import { LoadingState } from '@/components/admin/LoadingState';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { CompanyVerifier } from '@/components/admin/CompanyVerifier';

const AdminPage = () => {
  // Fetch all companies
  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: getAllCompanies,
  });
  
  if (isLoading) {
    return (
      <MainLayout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingState />
        </motion.div>
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
            <AdminHeader />
            
            <Card>
              <CardHeader>
                <CardTitle>Business Verification Requests</CardTitle>
                <CardDescription>
                  Review and manage business verification requests submitted by users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <CompanyVerifier companies={companies || []} />
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
