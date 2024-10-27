import express from 'express';
import dotenv from 'dotenv';
import { authRoutes } from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());

// Semua route menggunakan prefix '/api/auth'
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
