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
  courtCaseNumber: String,
  courtName: String,
  court_decision: String,
  start_date: Date,
  end_date: Date,
  is_active: Boolean,
  description: String,
  internal_notes: [{ note: String, user_id: String, date: Date }],
};

const CaseRecordSchema = createSchema(CaseRecordDefinition);
export const CaseRecord = mongoose.model('CaseRecord', CaseRecordSchema);
