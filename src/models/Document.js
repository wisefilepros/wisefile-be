import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const DocumentDefinition = {
  case_id: String,
  name: String,
  file_url: String,
  file_path: String,
  file_size: Number,
  file_type: String,
  is_deleted: Boolean,
  is_confidential: Boolean,
  is_temporary: Boolean,
  notes: String,
  tags: [String],
  uploaded_by: String,
  uploaded_at: Date,
  updated_at: Date,
  client_id: String,
};

const DocumentSchema = createSchema(DocumentDefinition);
export const Document = mongoose.model('Document', DocumentSchema);
