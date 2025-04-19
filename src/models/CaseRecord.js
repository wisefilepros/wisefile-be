import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const CaseRecordDefinition = {
  case_number: { type: String, required: true, unique: true },
  type: { type: String, enum: ['filing', 'collection', 'eviction'] },
  status: { type: String },
  sub_status: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  court_name: { type: String },
  court_case_number: { type: String },
  court_decision: { type: String },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' }],
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  management_company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ManagementCompany',
  },
  attorney_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  operator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  primary_contact_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  is_active: { type: Boolean, default: true },
  is_temporary: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  description: { type: String, default: '' },
  internal_notes: [{ note: String, user_id: String, date: Date }],
  rentFeesClaims: {
    filingPoNumber: { type: String, default: '' },
    baseRent: { type: Number, default: 0 },
    holdover: { type: Boolean, default: false },
    monthsUnpaid: { type: Number, default: 0 },
    currentMonthUnpaidDate: { type: Date, default: null },
    isSubsidized: { type: Boolean, default: false },
    rentalReliefApplication: { type: Boolean, default: false },
    lateFee: { type: Number, default: 0 },
    lateMonths: { type: Number, default: 0 },
    filingFee: { type: Number, default: 0 },
    miscDebts: [{ description: String, amount: Number }],
  },
  acknowledgment: {
    rentalReliefConfirmed: { type: Boolean, default: false },
    statementsConfirmed: { type: Boolean, default: false },
  },
  missing_attachments_reason: {
    lease: { selectedOverride: { type: String }, reason: { type: String } },
    ledger: { selectedOverride: { type: String }, reason: { type: String } },
    demand: { selectedOverride: { type: String }, reason: { type: String } },
    deed: { selectedOverride: { type: String }, reason: { type: String } },
  },
};

caseRecordSchema.index({ case_number: 1 }, { unique: true });
caseRecordSchema.index({ client_id: 1 });
caseRecordSchema.index({ status: 1 });
caseRecordSchema.index({ sub_status: 1 });
caseRecordSchema.index({ type: 1 });
caseRecordSchema.index({ management_company_id: 1 });

const CaseRecordSchema = createSchema(CaseRecordDefinition);
export const CaseRecord = mongoose.model('CaseRecord', CaseRecordSchema);
