import { pool } from '../config/database';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/user';

export class UserService {
  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  async createUser(userData: {
    email: string;
    password_raw: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    provider?: string;
    providerId?: string;
  }): Promise<IUser> {
    try {
      const passwordHash = await bcrypt.hash(userData.password_raw, 10);
      
      const result = await pool.query(
        `INSERT INTO users (
          email, 
          password_hash, 
          first_name, 
          last_name, 
          role, 
          provider, 
          provider_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`,
        [
          userData.email,
          passwordHash,
          userData.firstName || null,
          userData.lastName || null,
          userData.role || 'member',
          userData.provider || 'local',
          userData.providerId || null
        ]
      );

      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async findUserByProviderId(provider: string, providerId: string): Promise<IUser | null> {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE provider = $1 AND provider_id = $2',
        [provider, providerId]
      );
      
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error finding user by provider ID:', error);
      throw error;
    }
  }
} 