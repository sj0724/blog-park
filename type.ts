import { User as DbUser } from '@prisma/client';
import { Database } from './types/supabase';

export type ActionType<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type User = Pick<
  DbUser,
  'id' | 'name' | 'email' | 'image' | 'createdAt'
>;

export type Post = Database['public']['Tables']['posts']['Row'];

export type Comment = Database['public']['Tables']['comments']['Row'];
