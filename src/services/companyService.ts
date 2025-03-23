
import { supabase } from '@/lib/supabase';
import { Company, VerificationFormData } from '@/types';

// Helper function to convert Supabase row to our frontend Company type
const mapRowToCompany = (row: any): Company => ({
  id: row.id,
  name: row.name,
  registrationNumber: row.registration_number,
  country: row.country,
  website: row.website,
  description: row.description,
  bitcoinAddress: row.bitcoin_address,
  verificationStatus: row.verification_status,
  transactionId: row.transaction_id,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

// Get all companies
export const getAllCompanies = async (): Promise<Company[]> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching companies:', error);
    throw new Error(error.message);
  }

  return data ? data.map(mapRowToCompany) : [];
};

// Get a single company by ID
export const getCompanyById = async (id: string): Promise<Company | null> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching company with ID ${id}:`, error);
    throw new Error(error.message);
  }

  return data ? mapRowToCompany(data) : null;
};

// Submit a new verification request
export const submitVerification = async (formData: VerificationFormData): Promise<Company> => {
  try {
    // Generate a Bitcoin address for this company
    // In a production app, you would use a proper Bitcoin address generation service
    const bitcoinAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'; 

    const { data, error } = await supabase
      .from('companies')
      .insert({
        name: formData.name,
        registration_number: formData.registrationNumber,
        country: formData.country,
        website: formData.website || null,
        description: formData.description || null,
        bitcoin_address: bitcoinAddress,
        verification_status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error submitting verification:', error);
      throw new Error(`Failed to submit verification: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned from submission');
    }

    return mapRowToCompany(data);
  } catch (error) {
    console.error('Error in submitVerification:', error);
    throw error;
  }
};

// Submit transaction ID for verification
export const submitTransactionId = async (companyId: string, txId: string): Promise<Company> => {
  const { data, error } = await supabase
    .from('companies')
    .update({
      transaction_id: txId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', companyId)
    .select()
    .single();

  if (error) {
    console.error('Error submitting transaction ID:', error);
    throw new Error(error.message);
  }

  return mapRowToCompany(data);
};

// Update verification status
export const updateVerificationStatus = async (
  companyId: string, 
  status: 'pending' | 'verified' | 'rejected'
): Promise<Company> => {
  const { data, error } = await supabase
    .from('companies')
    .update({
      verification_status: status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', companyId)
    .select()
    .single();

  if (error) {
    console.error('Error updating verification status:', error);
    throw new Error(error.message);
  }

  return mapRowToCompany(data);
};
