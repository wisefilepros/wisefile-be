      // src/models/Client.js
      import mongoose from 'mongoose';
      import { createSchema } from './baseSchema.js';

      const ClientDefinition = {
        legal_name: String,
display_name: String,
phone_number: String,
email: String,
client_code: String,
is_active: { type: Boolean, default: true },
is_deleted: { type: Boolean, default: false },
mailing_address: { type: Object, default: {} },
billing_address: { type: Object, default: {} },
physical_address: { type: Object, default: {} },
management_companies: [{ _id: String, name: String, users: [String], created_at: Date, updated_at: Date }],
users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      };

      const ClientSchema = createSchema(ClientDefinition);
      export const Client = mongoose.model('Client', ClientSchema);
