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
    // 1. Fetch the client to get its client_code
    const client = await db.clients.getClientById(req.body.client_id);
    if (!client) {
      return res.status(400).json({ message: 'Invalid client_id provided' });
    }

    // 2. Fetch existing case numbers for this client
    const existing = await db.caseRecords.findMany({
      client_id: req.body.client_id,
      is_temporary: false,
      is_deleted: false,
    });
    const existing_case_numbers = existing.map((c) => c.case_number);

    // 3. Generate the correct case number using client_code
    const case_number = generateCaseNumber(
      client.client_code,
      existing_case_numbers
    );

    // 4. Create the case
    const record = await db.caseRecords.createCaseRecord({
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
    console.error('Error creating case record:', err);
    res
      .status(500)
      .json({ message: 'Failed to create case record', error: err.message });
  }
};

export const updateCaseRecord = async (req, res) => {
  try {
    const updated = await db.caseRecords.updateCaseRecord(
      req.params.id,
      req.body
    );
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
    const deleted = await db.caseRecords.deleteCaseRecord(req.params.id);
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
