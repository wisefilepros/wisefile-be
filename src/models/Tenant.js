import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const TenantDefinition = {
  tenant_code: String,
  full_name: String,
  first_name: String,
  last_name: String,
  phone_number: String,
  email: String,
  lease_start_date: Date,
  lease_end_date: Date,
  lease_status: String,
  lease_type: String,
  forwarding_address: String,
  is_active: Boolean,
  associated_properties: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  ],
};

const TenantSchema = createSchema(TenantDefinition);
export const Tenant = mongoose.model('Tenant', TenantSchema);
