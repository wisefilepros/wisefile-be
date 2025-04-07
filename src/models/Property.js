import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const PropertyDefinition = {
  address: String,
  city: String,
  state: String,
  zip: String,
  formatted_address: String,
  management_company: String,
  associated_tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' }],
};

const PropertySchema = createSchema(PropertyDefinition);
export const Property = mongoose.model('Property', PropertySchema);
