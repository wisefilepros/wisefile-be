import { db } from '../db/index.js';
import { logActivity } from '../utils/logActivity.js';

export const getAllFee = async (req, res) => {
  try {
    const items = await db.getAllFees();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch fees' });
  }
};

export const getFeeById = async (req, res) => {
  try {
    const item = await db.getFeeById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Fee not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch fee' });
  }
};

export const createFee = async (req, res) => {
  try {
    const newItem = await db.createFee(req.body);
    await logActivity({
      user_id: req.user._id,
      action: 'create',
      entity_type: 'fee',
      entity_id: newItem._id,
      details: `Created new fee: ${newItem._id}`,
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create fee' });
  }
};

export const updateFee = async (req, res) => {
  try {
    const updated = await db.updateFee(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Fee not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'update',
      entity_type: 'fee',
      entity_id: req.params.id,
      details: `Updated fee: ${req.params.id}`,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update fee' });
  }
};

export const deleteFee = async (req, res) => {
  try {
    const deleted = await db.deleteFee(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Fee not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'delete',
      entity_type: 'fee',
      entity_id: req.params.id,
      details: `Deleted fee: ${req.params.id}`,
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete fee' });
  }
};
