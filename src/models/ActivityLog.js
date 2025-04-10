import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const ActivityLogDefinition = {
  entity_id: String,
  entity_type: String,
  action_type: String,
  action: String,
  details: String,
  user_id: String,
  timestamp: Date,
};

const ActivityLogSchema = createSchema(ActivityLogDefinition);
export const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);
