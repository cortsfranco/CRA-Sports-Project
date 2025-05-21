declare module 'passport-strava-oauth2' {
  import { Strategy as PassportStrategy } from 'passport';
  
  export class Strategy extends PassportStrategy {
    constructor(
      options: {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
      },
      verify: (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (error: any, user?: any) => void
      ) => void
    );
  }
}

declare module 'passport-strava-oauth2'; 