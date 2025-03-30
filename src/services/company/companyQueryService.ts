
import { supabase } from '@/integrations/supabase/client';
import { Company } from '@/types';
import { mapRowToCompany } from '../utils/dbMappers';

/**
 * Retrieves all companies from the database
 */
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

/**
 * Retrieves a single company by ID
 */
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
