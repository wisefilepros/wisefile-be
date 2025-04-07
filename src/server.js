import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env.js';

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

// Health check route
app.get('/', (req, res) => {
  res.status(200).send('WiseFile backend is running.');
});

// Connect to Mongo
mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(config.port, () =>
      console.log(
        `🚀 Server running on port ${config.port} in ${config.env} mode`
      )
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // crash-safe: fail fast
  });
