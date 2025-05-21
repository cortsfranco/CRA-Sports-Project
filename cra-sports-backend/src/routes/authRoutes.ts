import { Router } from 'express';
import passport from 'passport';
import { register, login } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', passport.authenticate('local', { session: false }), login);

// Social login placeholders
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  res.json({ message: 'Google callback placeholder', user: req.user });
});

// Comentado temporalmente hasta resolver problemas con passport-instagram
/*
router.get('/instagram', passport.authenticate('instagram'));
router.get('/instagram/callback', passport.authenticate('instagram', { session: false }), (req, res) => {
  res.json({ message: 'Instagram callback placeholder', user: req.user });
});
*/

router.get('/strava', passport.authenticate('strava'));
router.get('/strava/callback', passport.authenticate('strava', { session: false }), (req, res) => {
  res.json({ message: 'Strava callback placeholder', user: req.user });
});

export default router; 