import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const ActivityLogDefinition = {
  entity_id: { type: String, required: true },
  entity_type: { type: String, required: true },
  action_type: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: String, default: '' },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: Date,
};

const ActivityLogSchema = createSchema(ActivityLogDefinition);

ActivityLogSchema.index({ user_id: 1 });
ActivityLogSchema.index({ action: 1 });
ActivityLogSchema.index({ entity_type: 1 });
ActivityLogSchema.index({ timestamp: 1 });

export const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);
