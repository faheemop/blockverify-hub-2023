
export interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  country: string;
  website?: string;
  description?: string;
  bitcoinAddress?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationFormData {
  name: string;
  registrationNumber: string;
  country: string;
  website?: string;
  description?: string;
  bitcoinAddress?: string;
}
