import { db } from '../db/index.js';
import { logActivity } from '../utils/logActivity.js';

export const getAllTenant = async (req, res) => {
  try {
    const items = await db.getAllTenants();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tenants' });
  }
};

export const getTenantById = async (req, res) => {
  try {
    const item = await db.getTenantById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Tenant not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tenant' });
  }
};

export const createTenant = async (req, res) => {
  try {
    const newItem = await db.createTenant(req.body);
    await logActivity({
      user_id: req.user._id,
      action: 'create',
      entity_type: 'tenant',
      entity_id: newItem._id,
      details: `Created new tenant: ${newItem._id}`,
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create tenant' });
  }
};

export const updateTenant = async (req, res) => {
  try {
    const updated = await db.updateTenant(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Tenant not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'update',
      entity_type: 'tenant',
      entity_id: req.params.id,
      details: `Updated tenant: ${req.params.id}`,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update tenant' });
  }
};

export const deleteTenant = async (req, res) => {
  try {
    const deleted = await db.deleteTenant(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Tenant not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'delete',
      entity_type: 'tenant',
      entity_id: req.params.id,
      details: `Deleted tenant: ${req.params.id}`,
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete tenant' });
  }
};
