
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          registration_number: string
          country: string
          website: string | null
          description: string | null
          bitcoin_address: string
          verification_status: 'pending' | 'verified' | 'rejected'
          transaction_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          registration_number: string
          country: string
          website?: string | null
          description?: string | null
          bitcoin_address?: string
          verification_status?: 'pending' | 'verified' | 'rejected'
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          registration_number?: string
          country?: string
          website?: string | null
          description?: string | null
          bitcoin_address?: string
          verification_status?: 'pending' | 'verified' | 'rejected'
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}
