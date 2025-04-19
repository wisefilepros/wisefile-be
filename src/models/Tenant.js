import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const TenantDefinition = {
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  tenant_code: { type: String, default: '' },
  full_name: { type: String, default: '', required: true },
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  phone_number: { type: String, default: '' },
  email: { type: String, default: '' },
  lease_start_date: { type: Date, default: null },
  lease_end_date: { type: Date, default: null },
  lease_status: { type: String, default: '' },
  lease_type: { type: String, default: '' },
  forwarding_address: { type: String, default: '' },
  is_active: { type: Boolean, default: true },
  associated_properties: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  ],
};

tenantSchema.index({ client_id: 1 });
tenantSchema.index({ full_name: 1 });

const TenantSchema = createSchema(TenantDefinition);
export const Tenant = mongoose.model('Tenant', TenantSchema);
