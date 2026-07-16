// Hand-written to match supabase/migrations/*.sql until the project is linked.
// Once you've run `npx supabase link`, regenerate the authoritative version with:
//   npx supabase gen types typescript --linked > src/integrations/supabase/types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          estate_planning_status: 'estate' | 'will' | 'both' | 'neither' | null;
          credit_pull_authorized: boolean;
          selfie_path: string | null;
          government_id_path: string | null;
          intent: 'planning' | 'discovery' | null;
          verification_status: 'not_started' | 'pending_review' | 'verified' | 'rejected';
          death_certificate_path: string | null;
          letters_testamentary_path: string | null;
          verification_notes: string | null;
          verification_submitted_at: string | null;
          verification_ai_summary: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      discovered_accounts: {
        Row: {
          id: string;
          user_id: string;
          institution: string;
          account_type: string;
          account_number_mask: string | null;
          balance: number;
          last_activity_at: string | null;
          status: 'active' | 'dormant' | 'forgotten';
          risk: 'low' | 'medium' | 'high';
          beneficiary_status: 'confirmed' | 'needs_review' | 'missing' | 'unknown';
          beneficiary_names: string | null;
          beneficiary_last_reviewed: string | null;
          closure_checklist: string[] | null;
          closure_checklist_generated_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['discovered_accounts']['Row']> & {
          user_id: string;
          institution: string;
          account_type: string;
        };
        Update: Partial<Database['public']['Tables']['discovered_accounts']['Row']>;
      };
      contacts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          role: string | null;
          category: 'legal' | 'financial' | 'insurance' | 'medical' | 'personal';
          firm: string | null;
          phone: string | null;
          email: string | null;
          address: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['contacts']['Row']> & {
          user_id: string;
          name: string;
          category: 'legal' | 'financial' | 'insurance' | 'medical' | 'personal';
        };
        Update: Partial<Database['public']['Tables']['contacts']['Row']>;
      };
      legal_documents: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          doc_type: 'poa' | 'will' | 'healthcare' | 'trust' | 'contract';
          status: 'current' | 'needs-review' | 'expired';
          last_updated: string | null;
          next_review: string | null;
          attorney: string | null;
          location: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['legal_documents']['Row']> & {
          user_id: string;
          name: string;
          doc_type: 'poa' | 'will' | 'healthcare' | 'trust' | 'contract';
        };
        Update: Partial<Database['public']['Tables']['legal_documents']['Row']>;
      };
      rewards_accounts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'airline' | 'hotel' | 'credit-card' | 'retail';
          program: string;
          balance: string;
          estimated_value: number;
          expiration_warning: string | null;
          monthly_perks: string[];
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['rewards_accounts']['Row']> & {
          user_id: string;
          name: string;
          type: 'airline' | 'hotel' | 'credit-card' | 'retail';
          program: string;
          balance: string;
        };
        Update: Partial<Database['public']['Tables']['rewards_accounts']['Row']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
