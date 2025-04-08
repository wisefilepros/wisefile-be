import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/', (req, res) => {
  res.status(200).send('WiseFile backend is running locally with fake DB.');
});

// Auth Routes
app.use('/api/auth', authRoutes);

// User Routes
app.use('/api/users', userRoutes);

// Start server without Mongo
app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port} in ${config.env} mode`);
});
