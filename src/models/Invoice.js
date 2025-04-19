import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const InvoiceDefinition = {
  case_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CaseRecord' },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  amount: { type: Number, required: true },
  description: { type: String, default: '' },
  invoice_number: { type: String, default: '' },
  invoice_date: { type: Date, default: Date.now },
  issued_date: { type: Date, default: Date.now },
  due_date: { type: Date },
  status: {
    type: String,
    enum: ['unpaid', 'paid', 'overdue'],
    default: 'unpaid',
  },
  payment_details: { type: Object, default: {} },
  stripe_invoice_id: { type: String, default: '' },
  stripe_payment_link: { type: String, default: '' },
  payment_method: { type: String, default: '' },
  payment_status: { type: String, default: '' },
  paid_at: { type: Date, default: null },
  associated_fees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fee' }],
  notes: { type: String, default: '' },
};

const InvoiceSchema = createSchema(InvoiceDefinition);

InvoiceSchema.index({ client_id: 1 });
InvoiceSchema.index({ case_id: 1 });
InvoiceSchema.index({ status: 1 });
InvoiceSchema.index({ due_date: 1 });

export const Invoice = mongoose.model('Invoice', InvoiceSchema);
