import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// @ts-ignore
import InstagramStrategy from 'passport-instagram';
import { Strategy as StravaStrategy } from 'passport-strava-oauth2';
import bcrypt from 'bcryptjs';
import { UserService } from '../services/userService';

const userService = new UserService();

// Local Strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await userService.findUserByEmail(email);
      
      if (!user) {
        return done(null, false, { message: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return done(null, false, { message: 'Invalid credentials' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Google Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userService.findUserByProviderId('google', profile.id);
      
      if (user) {
        return done(null, user);
      }

      // Create new user if doesn't exist
      const newUser = await userService.createUser({
        email: profile.emails?.[0]?.value || '',
        password_raw: Math.random().toString(36).slice(-8),
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        provider: 'google',
        providerId: profile.id
      });

      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
));

// Comentado temporalmente hasta resolver problemas con passport-instagram
/*
passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTAGRAM_CLIENT_ID || 'placeholder',
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || 'placeholder',
      callbackURL: process.env.INSTAGRAM_CALLBACK_URL || '/api/auth/instagram/callback',
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      // TODO: lógica de usuario Instagram
      return done(null, profile);
    }
  )
);
*/

passport.use(
  new StravaStrategy(
    {
      clientID: process.env.STRAVA_CLIENT_ID || 'placeholder',
      clientSecret: process.env.STRAVA_CLIENT_SECRET || 'placeholder',
      callbackURL: process.env.STRAVA_CALLBACK_URL || '/api/auth/strava/callback',
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      // TODO: lógica de usuario Strava
      return done(null, profile);
    }
  )
);

// Serialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userService.findUserByEmail(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport; 