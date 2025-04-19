import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const MessageDefinition = {
  case_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CaseRecord' },
  content: { type: String },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  is_deleted: { type: Boolean, default: false },
  visible_to_users: { type: Boolean, default: true },
  attachments: [
    {
      name: { type: String, default: '' },
      url: { type: String, default: '' },
      type: { type: String, default: '' },
      size: { type: Number, default: 0 },
    },
  ],
  message_type: {
    type: String,
    enum: ['text', 'file', 'alert'],
    default: 'text',
  },
  read_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
};

messageSchema.index({ case_id: 1 });
messageSchema.index({ recipient_ids: 1 });
messageSchema.index({ read_by: 1 });
messageSchema.index({ message_type: 1 });

const MessageSchema = createSchema(MessageDefinition);
export const Message = mongoose.model('Message', MessageSchema);
