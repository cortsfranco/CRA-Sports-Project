import { UserService } from './userService';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/user';
import { generateToken } from '../utils/jwtHelpers';

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(userData: {
    email: string;
    password_raw: string;
    firstName?: string;
    lastName?: string;
  }): Promise<{ user: IUser; token: string }> {
    // Check if user already exists
    const existingUser = await this.userService.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const user = await this.userService.createUser({
      ...userData,
      provider: 'local'
    });

    // Generate JWT token
    const token = generateToken(user);

    return { user, token };
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    // Find user by email
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken(user);

    return { user, token };
  }

  async findOrCreateUserByProvider(provider: string, providerId: string, userData: {
    email: string;
    firstName?: string;
    lastName?: string;
  }): Promise<{ user: IUser; token: string }> {
    // Check if user exists with this provider ID
    let user = await this.userService.findUserByProviderId(provider, providerId);

    if (!user) {
      // Check if user exists with this email
      user = await this.userService.findUserByEmail(userData.email);
      
      if (!user) {
        // Create new user
        user = await this.userService.createUser({
          ...userData,
          provider,
          providerId,
          password_raw: Math.random().toString(36).slice(-8) // Generate random password
        });
      } else {
        // Update existing user with provider info
        // TODO: Implement updateUser method in UserService
        throw new Error('User exists but provider update not implemented');
      }
    }

    // Generate JWT token
    const token = generateToken(user);

    return { user, token };
  }
} 