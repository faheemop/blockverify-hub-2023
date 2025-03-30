
import { supabase } from '@/integrations/supabase/client';
import { Company } from '@/types';
import { mapRowToCompany } from '../utils/dbMappers';

/**
 * Submits a transaction ID for verification
 */
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
