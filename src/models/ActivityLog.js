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

activityLogSchema.index({ user_id: 1 });
activityLogSchema.index({ action: 1 });
activityLogSchema.index({ entity_type: 1 });
activityLogSchema.index({ timestamp: 1 });

const ActivityLogSchema = createSchema(ActivityLogDefinition);
export const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);
