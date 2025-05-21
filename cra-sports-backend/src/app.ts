import express from 'express';
import cors from 'cors';
import passport from './config/passport';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import healthRoutes from './routes/healthRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', healthRoutes);

app.use(errorHandler);

export default app; 