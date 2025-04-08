import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const RefreshTokenDefinition = {
  user_id: String,
  token: String,
};

const RefreshTokenSchema = createSchema(RefreshTokenDefinition);
export const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
