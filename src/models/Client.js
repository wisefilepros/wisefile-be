import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const ManagementCompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    users: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
  },
  { timestamps: true }
);

const ClientDefinition = {
  legal_name: { type: String, required: true },
  display_name: { type: String, required: true },
  phone_number: { type: String },
  email: { type: String, required: true },
  client_code: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  mailing_address: { type: Object, default: {} },
  billing_address: { type: Object, default: {} },
  physical_address: { type: Object, default: {} },
  management_companies: [ManagementCompanySchema],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
};

clientSchema.index({ client_code: 1 }, { unique: true });
clientSchema.index({ display_name: 1 });

const ClientSchema = createSchema(ClientDefinition);
export const Client = mongoose.model('Client', ClientSchema);
