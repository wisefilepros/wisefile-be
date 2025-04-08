import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const PasswordDefinition = {
  user_id: String,
  hash: String,
};

const PasswordSchema = createSchema(PasswordDefinition);
export const Password = mongoose.model('Password', PasswordSchema);
