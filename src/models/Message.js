import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const MessageDefinition = {
  case_id: String,
  content: String,
  sender_id: String,
  recipient_ids: [String],
  created_at: Date,
  is_read: Boolean,
  is_deleted: Boolean,
  visible_to_users: Boolean,
  attachments: [String],
  message_type: { type: String, enum: ['text', 'file', 'alert'] },
  read_by: [String],
};

const MessageSchema = createSchema(MessageDefinition);
export const Message = mongoose.model('Message', MessageSchema);
