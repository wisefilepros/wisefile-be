import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const InvoiceDefinition = {
  case_id: String,
  client_id: String,
  amount: Number,
  description: String,
  issued_date: Date,
  due_date: Date,
  status: { type: String, enum: ['unpaid', 'paid', 'overdue'] },
  notes: String,
};

const InvoiceSchema = createSchema(InvoiceDefinition);
export const Invoice = mongoose.model('Invoice', InvoiceSchema);
