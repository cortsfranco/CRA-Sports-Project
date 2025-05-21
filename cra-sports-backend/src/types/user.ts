export interface IUser {
  id: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  role: string;
  provider: string;
  provider_id?: string;
  created_at: Date;
  updated_at: Date;
} 