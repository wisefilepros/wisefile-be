import { db } from '../db/index.js';
import { uploadToS3, deleteFromS3 } from '../utils/s3.js';
import { logActivity } from '../utils/logActivity.js';
import { getDocumentsForUser } from '../utils/filteredResults.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() }).single('file');

export const getAllDocuments = async (req, res) => {
  try {
    const documents = await getDocumentsForUser(req.user);
    res.status(200).json(documents);
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const item = await db.documents.getDocumentById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Document not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch document' });
  }
};

export const createDocument = [
  upload,
  async (req, res) => {
    try {
      const {
        case_id,
        name,
        notes,
        tags,
        client_id,
        is_confidential,
        is_temporary,
        type,
      } = req.body;
      const file = req.file;

      if (!file) return res.status(400).json({ message: 'File is required' });

      const { file_url, file_path, file_type } = await uploadToS3(
        file.buffer,
        file.originalname,
        file.mimetype
      );

      const doc = await db.documents.createDocument({
        case_id,
        client_id,
        name: name || file.originalname,
        notes,
        tags: tags ? tags.split(',') : [],
        is_confidential: is_confidential === 'true',
        is_temporary: is_temporary === 'true',
        type,
        file_url,
        file_path,
        file_type,
        uploaded_by: req.user._id,
        uploaded_at: new Date(),
      });

      await logActivity({
        user_id: req.user._id,
        action: 'create',
        entity_type: 'document',
        entity_id: doc._id,
        details: `Uploaded document ${doc.name}`,
      });

      res.status(201).json(doc);
    } catch (err) {
      console.error('Failed to upload document:', err);
      res.status(500).json({ message: 'Failed to upload document' });
    }
  },
];

export const updateDocument = async (req, res) => {
  try {
    const updated = await db.documents.updateDocument(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ message: 'Document not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'update',
      entity_type: 'document',
      entity_id: req.params.id,
      details: `Updated document: ${req.params.id}`,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update document' });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await db.documents.getDocumentById(req.params.id);
    if (!document)
      return res.status(404).json({ message: 'Document not found' });

    // Delete the file from S3
    await deleteFromS3(document.file_path);

    // Remove from DB
    await db.documents.deleteDocument(req.params.id);

    await logActivity({
      user_id: req.user._id,
      action: 'delete',
      entity_type: 'document',
      entity_id: req.params.id,
      details: `Deleted document ${document.name}`,
    });

    res.status(200).json({ message: 'Document deleted' });
  } catch (err) {
    console.error('Failed to delete document:', err);
    res.status(500).json({ message: 'Failed to delete document' });
  }
};
