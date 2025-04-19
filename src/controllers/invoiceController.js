import { db } from '../db/index.js';
import { logActivity } from '../utils/logActivity.js';
import { getInvoicesForUser } from '../utils/filteredResults.js';

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await getInvoicesForUser(req.user);
    res.status(200).json(invoices);
  } catch (err) {
    console.error('Error fetching invoices:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const item = await db.invoices.getInvoiceById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch invoice' });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const newItem = await db.invoices.createInvoice(req.body);
    await logActivity({
      user_id: req.user._id,
      action: 'create',
      entity_type: 'invoice',
      entity_id: newItem._id,
      details: `Created new invoice: ${newItem._id}`,
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create invoice' });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const updated = await db.invoices.updateInvoice(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Invoice not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'update',
      entity_type: 'invoice',
      entity_id: req.params.id,
      details: `Updated invoice: ${req.params.id}`,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update invoice' });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const deleted = await db.invoices.deleteInvoice(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Invoice not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'delete',
      entity_type: 'invoice',
      entity_id: req.params.id,
      details: `Deleted invoice: ${req.params.id}`,
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete invoice' });
  }
};
