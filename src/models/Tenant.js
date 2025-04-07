import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const TenantDefinition = {
  full_name: String,
  first_name: String,
  last_name: String,
  associated_properties: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  ],
};

const TenantSchema = createSchema(TenantDefinition);
export const Tenant = mongoose.model('Tenant', TenantSchema);
