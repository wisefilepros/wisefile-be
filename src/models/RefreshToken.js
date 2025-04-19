import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const RefreshTokenDefinition = {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: { type: String, required: true },
};

refreshTokenSchema.index({ user_id: 1 });
refreshTokenSchema.index({ token: 1 });
refreshTokenSchema.index({ updated_at: 1 }, { expireAfterSeconds: 2592000 }); // 30 days


const RefreshTokenSchema = createSchema(RefreshTokenDefinition);
export const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
