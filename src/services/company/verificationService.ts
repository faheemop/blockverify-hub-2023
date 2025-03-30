
import { supabase } from '@/integrations/supabase/client';
import { Company, VerificationFormData } from '@/types';
import { mapRowToCompany } from '../utils/dbMappers';
import { generateBitcoinAddress } from './bitcoinAddressService';

/**
 * Submits a new company verification request
 */
export const submitVerification = async (formData: VerificationFormData): Promise<Company> => {
  try {
    // Generate a unique Bitcoin address for this company
    const bitcoinAddress = generateBitcoinAddress();

    const companyData = {
      name: formData.name,
      registration_number: formData.registrationNumber,
      country: formData.country,
      website: formData.website || null,
      description: formData.description || null,
      bitcoin_address: bitcoinAddress,
      verification_status: 'pending',
    };

    console.log('Submitting company data:', companyData);

    const { data, error } = await supabase
      .from('companies')
      .insert(companyData)
      .select()
      .single();

    if (error) {
      console.error('Error submitting verification:', error);
      throw new Error(`Failed to submit verification: ${error.message || 'Database error occurred'}`);
    }

    if (!data) {
      console.error('No data returned from submission');
      throw new Error('No data returned from submission');
    }

    return mapRowToCompany(data);
  } catch (error: any) {
    console.error('Error in submitVerification:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to submit verification: ${error?.message || 'Unknown error occurred'}`);
    }
  }
};

/**
 * Updates the verification status of a company
 */
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
