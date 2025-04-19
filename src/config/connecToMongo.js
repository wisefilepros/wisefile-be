import mongoose from 'mongoose';
import { config } from './env.js';

export async function connectToMongo() {
  const uri = config.mongoUri;

  if (!uri) {
    console.warn('⚠️  No Mongo URI found in config. Skipping DB connection.');
    return;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
}
