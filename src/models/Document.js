import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const DocumentDefinition = {
  name: { type: String, default: '' },
  file_url: { type: String, default: '' },
  file_type: { type: String, default: '' },
  file_size: { type: Number, default: 0 },
  type: { type: String, default: '' },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  case_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CaseRecord' },
  uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploaded_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, default: false },
  is_confidential: { type: Boolean, default: false },
  is_temporary: { type: Boolean, default: false },
  description: { type: String, default: '' },
  notes: { type: String, default: '' },
  tags: { type: [String], default: [] },
};

const DocumentSchema = createSchema(DocumentDefinition);

DocumentSchema.index({ client_id: 1 });
DocumentSchema.index({ case_id: 1 });
DocumentSchema.index({ type: 1 });
DocumentSchema.index({ uploaded_by: 1 });

export const Document = mongoose.model('Document', DocumentSchema);
