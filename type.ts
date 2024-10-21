import { Database } from './types/supabase';

export type ActionType<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type SeesionData = {
  id: string;
  name: string;
  image: string | null;
  email: string;
};

export type Post = Database['public']['Tables']['posts']['Row'];

export type Comment = Database['public']['Tables']['comments']['Row'];

export type SupabaseUser = Database['public']['Tables']['users']['Row'];

export type Log = Database['public']['Tables']['activity_logs']['Row'];
