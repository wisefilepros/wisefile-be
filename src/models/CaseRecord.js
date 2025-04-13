import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const CaseRecordDefinition = {
  case_number: String,
  type: { type: String, enum: ['filing', 'collection', 'eviction'] },
  client_id: String,
  property_id: String,
  tenant_id: String,
  attorney_id: String,
  operator_id: String,
  primary_contact_id: String,
  status: String,
  sub_status: String,
  court_case_number: String,
  court_name: String,
  court_decision: String,
  start_date: Date,
  end_date: Date,
  is_active: Boolean,
  is_temporary: Boolean,
  description: String,
  internal_notes: [{ note: String, user_id: String, date: Date }],
  rentFeesClaims: {
    filingPoNumber: String,
    baseRent: Number,
    holdover: Boolean,
    monthsUnpaid: Number,
    currentMonthUnpaidDate: Date,
    isSubsidized: Boolean,
    rentalReliefApplication: Boolean,
    lateFee: Number,
    lateMonths: Number,
    filingFee: Number,
    miscDebts: [{ description: String, amount: Number }]
  },
  acknowledgment: {
    rentalReliefConfirmed: Boolean,
    statementsConfirmed: Boolean
  },
  missing_attachments_reason: {
    lease: { selectedOverride: String, reason: String },
    ledger: { selectedOverride: String, reason: String },
    demand: { selectedOverride: String, reason: String },
    deed: { selectedOverride: String, reason: String }
  }
};

const CaseRecordSchema = createSchema(CaseRecordDefinition);
export const CaseRecord = mongoose.model('CaseRecord', CaseRecordSchema);