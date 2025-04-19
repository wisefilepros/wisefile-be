import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const FeeDefinition = {
  case_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CaseRecord' },
  type: { type: String, default: '' },
  amount: { type: Number, required: true },
  description: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'paid', 'waived'],
    default: 'pending',
  },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
};

feeSchema.index({ case_id: 1 });
feeSchema.index({ client_id: 1 });

const FeeSchema = createSchema(FeeDefinition);
export const Fee = mongoose.model('Fee', FeeSchema);
