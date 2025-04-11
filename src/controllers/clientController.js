import { db } from '../db/index.js';
import { logActivity } from '../utils/logActivity.js';

export const getAllClient = async (req, res) => {
  try {
    const items = await db.getAllClients();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch clients' });
  }
};

export const getClientById = async (req, res) => {
  try {
    const item = await db.getClientById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch client' });
  }
};

export const createClient = async (req, res) => {
  try {
    const newItem = await db.createClient(req.body);
    await logActivity({
      user_id: req.user._id,
      action: 'create',
      entity_type: 'client',
      entity_id: newItem._id,
      details: `Created new client: ${newItem._id}`,
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create client' });
  }
};

export const updateClient = async (req, res) => {
  try {
    const updated = await db.updateClient(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Client not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'update',
      entity_type: 'client',
      entity_id: req.params.id,
      details: `Updated client: ${req.params.id}`,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update client' });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const deleted = await db.deleteClient(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Client not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'delete',
      entity_type: 'client',
      entity_id: req.params.id,
      details: `Deleted client: ${req.params.id}`,
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete client' });
  }
};
