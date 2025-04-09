import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const PropertyDefinition = {
  property_code: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  formatted_address: String,
  unit_count: Number,
  is_commercial: Boolean,
  occupancy_status: String,
  is_active: Boolean,
  management_company: String,
  associated_tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' }],
};

const PropertySchema = createSchema(PropertyDefinition);
export const Property = mongoose.model('Property', PropertySchema);
