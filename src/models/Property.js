import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const PropertyDefinition = {
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  property_code: { type: String, default: '' },
  address: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  zip: { type: String, default: '' },
  formatted_address: { type: String, required: true },
  unit_count: { type: Number, default: 0 },
  is_commercial: { type: Boolean, default: false },
  occupancy_status: { type: String, default: '' },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  management_company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ManagementCompany',
  },
  associated_tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' }],
};

const PropertySchema = createSchema(PropertyDefinition);

PropertySchema.index({ client_id: 1 });
PropertySchema.index({ formatted_address: 1 });
PropertySchema.index({ management_company_id: 1 });

export const Property = mongoose.model('Property', PropertySchema);
