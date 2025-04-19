import { db } from '../db/index.js';
import { getCaseRecordsForUser } from '../utils/filteredResults.js';
import { logActivity } from '../utils/logActivity.js';
import { generateCaseNumber } from '../utils/generators.js';

export const getAllCaseRecords = async (req, res) => {
  try {
    const cases = await getCaseRecordsForUser(req.user);
    res.status(200).json(cases);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch case records' });
  }
};

export const getCaseDetail = async (req, res) => {
  try {
    const record = await db.caseRecords.getCaseDetail(req.params.id);
    if (!record) return res.status(404).json({ message: 'Case not found' });
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch case record' });
  }
};

export const createCaseRecord = async (req, res) => {
  try {
    const case_number = await generateCaseNumber(req.body.client_id);
    const record = await db.createCaseRecord({
      ...req.body,
      case_number,
    });

    await logActivity({
      user_id: req.user._id,
      action: 'create',
      entity_type: 'caserecord',
      entity_id: record._id,
      details: `Created case ${case_number}`,
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create case record' });
  }
};

export const updateCaseRecord = async (req, res) => {
  try {
    const updated = await db.updateCaseRecord(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Case not found' });

    await logActivity({
      user_id: req.user._id,
      action: 'update',
      entity_type: 'caserecord',
      entity_id: req.params.id,
      details: `Updated case ${req.params.id}`,
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update case record' });
  }
};

export const deleteCaseRecord = async (req, res) => {
  try {
    const deleted = await db.deleteCaseRecord(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Case not found' });

    await logActivity({
      user_id: req.user._id,
      action: 'delete',
      entity_type: 'caserecord',
      entity_id: req.params.id,
      details: `Deleted case ${req.params.id}`,
    });

    res.status(200).json({ message: 'Case deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete case record' });
  }
};
