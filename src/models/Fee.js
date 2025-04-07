      // src/models/Fee.js
      import mongoose from 'mongoose';
      import { createSchema } from './baseSchema.js';

      const FeeDefinition = {
        case_id: String,
type: String,
amount: Number,
description: String,
status: { type: String, enum: ['pending', 'paid', 'waived'] },
client_id: String,
      };

      const FeeSchema = createSchema(FeeDefinition);
      export const Fee = mongoose.model('Fee', FeeSchema);
