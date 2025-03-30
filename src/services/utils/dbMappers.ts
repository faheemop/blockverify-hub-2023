
import { Company } from '@/types';

/**
 * Converts a Supabase database row to a frontend Company type
 */
export const mapRowToCompany = (row: any): Company => ({
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
