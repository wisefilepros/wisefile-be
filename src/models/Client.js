import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const ClientDefinition = {
  legal_name: String,
  display_name: String,
  phone_number: String,
  email: String,
  management_company: [String],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
};

const ClientSchema = createSchema(ClientDefinition);
export const Client = mongoose.model('Client', ClientSchema);
