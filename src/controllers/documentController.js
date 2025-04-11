import { db } from '../db/index.js';
import { logActivity } from '../utils/logActivity.js';

export const getAllDocument = async (req, res) => {
  try {
    const items = await db.getAllDocuments();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const item = await db.getDocumentById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Document not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch document' });
  }
};

export const createDocument = async (req, res) => {
  try {
    const newItem = await db.createDocument(req.body);
    await logActivity({
      user_id: req.user._id,
      action: 'create',
      entity_type: 'document',
      entity_id: newItem._id,
      details: `Created new document: ${newItem._id}`,
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create document' });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const updated = await db.updateDocument(req.params.id, req.body);
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
    const deleted = await db.deleteDocument(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: 'Document not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'delete',
      entity_type: 'document',
      entity_id: req.params.id,
      details: `Deleted document: ${req.params.id}`,
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete document' });
  }
};
