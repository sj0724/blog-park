import { User as DbUser } from '@prisma/client';

export type ActionType<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type User = Pick<
  DbUser,
  'id' | 'name' | 'email' | 'image' | 'createdAt'
>;
