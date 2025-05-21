export interface IUser {
  id: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  role?: string; // default: 'member'
  provider: string; // 'local', 'google', etc.
  provider_id?: string;
} 