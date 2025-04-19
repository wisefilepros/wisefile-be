import { db } from '../db/index.js';
import { logActivity } from '../utils/logActivity.js';
import { getPropertiesForUser } from '../utils/filteredResults.js';

export const getAllProperties = async (req, res) => {
  try {
    const properties = await getPropertiesForUser(req.user);
    res.status(200).json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const item = await db.properties.getPropertyById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch property' });
  }
};

export const createProperty = async (req, res) => {
  try {
    const newItem = await db.properties.createProperty(req.body);
    await logActivity({
      user_id: req.user._id,
      action: 'create',
      entity_type: 'property',
      entity_id: newItem._id,
      details: `Created new property: ${newItem._id}`,
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create property' });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const updated = await db.properties.updateProperty(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ message: 'Property not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'update',
      entity_type: 'property',
      entity_id: req.params.id,
      details: `Updated property: ${req.params.id}`,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update property' });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const deleted = await db.properties.deleteProperty(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: 'Property not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'delete',
      entity_type: 'property',
      entity_id: req.params.id,
      details: `Deleted property: ${req.params.id}`,
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete property' });
  }
};
