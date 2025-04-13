import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const InvoiceDefinition = {
  case_id: String,
  client_id: String,
  amount: Number,
  description: String,
  invoice_number: String,
  invoice_date: Date,
  issued_date: Date,
  due_date: Date,
  status: { type: String, enum: ['unpaid', 'paid', 'overdue'] },
  payment_details: { type: Object, default: {} },
  stripe_invoice_id: String,
  stripe_payment_link: String,
  payment_method: String,
  payment_status: String,
  paid_at: Date,
  associated_fees: [String],
  notes: String,
};

const InvoiceSchema = createSchema(InvoiceDefinition);
export const Invoice = mongoose.model('Invoice', InvoiceSchema);
