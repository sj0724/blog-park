import { SupabaseUser } from '@/type';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      accounts: {
        Row: {
          access_token: string | null;
          expires_at: number | null;
          id: string;
          id_token: string | null;
          provider: string;
          provider_account_id: string;
          refresh_token: string | null;
          scope: string | null;
          session_state: string | null;
          token_type: string | null;
          type: string;
          user_id: string;
        };
        Insert: {
          access_token?: string | null;
          expires_at?: number | null;
          id: string;
          id_token?: string | null;
          provider: string;
          provider_account_id: string;
          refresh_token?: string | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type: string;
          user_id: string;
        };
        Update: {
          access_token?: string | null;
          expires_at?: number | null;
          id?: string;
          id_token?: string | null;
          provider?: string;
          provider_account_id?: string;
          refresh_token?: string | null;
          scope?: string | null;
          session_state?: string | null;
          token_type?: string | null;
          type?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      activity_logs: {
        Row: {
          comment_count: number | null;
          created_at: string;
          id: string;
          like_count: number | null;
          post_count: number | null;
          pr_count: number | null;
          pr_url: string | null;
          rate: number | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          comment_count?: number | null;
          created_at?: string;
          id?: string;
          like_count?: number | null;
          post_count?: number | null;
          pr_count?: number | null;
          pr_url?: string | null;
          rate?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          comment_count?: number | null;
          created_at?: string;
          id?: string;
          like_count?: number | null;
          post_count?: number | null;
          pr_count?: number | null;
          pr_url?: string | null;
          rate?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'activity_logs_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      alarms: {
        Row: {
          content: string;
          createdAt: string | null;
          id: string;
          isRead: boolean;
          owner_id: string | null;
          routePath: string | null;
          user_id: string;
          user: SupabaseUser;
        };
        Insert: {
          content: string;
          createdAt?: string | null;
          id?: string;
          isRead?: boolean;
          owner_id?: string | null;
          routePath?: string | null;
          user_id: string;
        };
        Update: {
          content?: string;
          createdAt?: string | null;
          id?: string;
          isRead?: boolean;
          owner_id?: string | null;
          routePath?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'alarms_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'alarms_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      comments: {
        Row: {
          content: string;
          createdAt: string | null;
          id: string;
          post_id: string;
          user_id: string;
          user: SupabaseUser;
        };
        Insert: {
          content: string;
          createdAt?: string | null;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          content?: string;
          createdAt?: string | null;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      follows: {
        Row: {
          createdAt: string | null;
          followerId: string;
          followingId: string;
          id: string;
        };
        Insert: {
          createdAt?: string | null;
          followerId: string;
          followingId: string;
          id?: string;
        };
        Update: {
          createdAt?: string | null;
          followerId?: string;
          followingId?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'follows_followerId_fkey';
            columns: ['followerId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'follows_followingId_fkey';
            columns: ['followingId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      likes: {
        Row: {
          createdAt: string | null;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          createdAt?: string | null;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          createdAt?: string | null;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      posts: {
        Row: {
          content: string;
          createdAt: string;
          id: string;
          isPublished: boolean;
          like_count: number | null;
          summation: string;
          tag: string[] | null;
          thumbnail: string;
          title: string;
          updatedAt: string;
          user_id: string;
          posts_user_id_fkey: SupabaseUser;
        };
        Insert: {
          content: string;
          createdAt?: string;
          id?: string;
          isPublished?: boolean;
          like_count?: number | null;
          summation: string;
          tag?: string[] | null;
          thumbnail?: string;
          title: string;
          updatedAt?: string;
          user_id: string;
        };
        Update: {
          content?: string;
          createdAt?: string;
          id?: string;
          isPublished?: boolean;
          like_count?: number | null;
          summation?: string;
          tag?: string[] | null;
          thumbnail?: string;
          title?: string;
          updatedAt?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'posts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      sessions: {
        Row: {
          expires: string;
          id: string;
          session_token: string;
          user_id: string;
        };
        Insert: {
          expires: string;
          id: string;
          session_token: string;
          user_id: string;
        };
        Update: {
          expires?: string;
          id?: string;
          session_token?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      temporary_posts: {
        Row: {
          content: string;
          createdAt: string;
          id: string;
          title: string;
          user_id: string;
        };
        Insert: {
          content: string;
          createdAt?: string;
          id?: string;
          title: string;
          user_id: string;
        };
        Update: {
          content?: string;
          createdAt?: string;
          id?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          createdAt: string;
          email: string | null;
          id: string;
          image: string | null;
          introduction: string | null;
          name: string | null;
          oauth_account: boolean | null;
          password: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          email?: string | null;
          id?: string;
          image?: string | null;
          introduction?: string | null;
          name?: string | null;
          oauth_account?: boolean | null;
          password: string;
          updatedAt?: string;
        };
        Update: {
          createdAt?: string;
          email?: string | null;
          id?: string;
          image?: string | null;
          introduction?: string | null;
          name?: string | null;
          oauth_account?: boolean | null;
          password?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      verificationtokens: {
        Row: {
          expires: string;
          identifier: string;
          token: string;
        };
        Insert: {
          expires: string;
          identifier: string;
          token: string;
        };
        Update: {
          expires?: string;
          identifier?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_verification_token_user';
            columns: ['identifier'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['email'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_unique_tags: {
        Args: Record<PropertyKey, never>;
        Returns: {
          tag: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;
