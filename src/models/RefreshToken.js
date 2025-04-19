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

const RefreshTokenSchema = createSchema(RefreshTokenDefinition);

RefreshTokenSchema.index({ user_id: 1 });
RefreshTokenSchema.index({ token: 1 });
RefreshTokenSchema.index({ updated_at: 1 }, { expireAfterSeconds: 2592000 }); // 30 days

export const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
