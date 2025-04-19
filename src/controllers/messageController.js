import { db } from '../db/index.js';
import { logActivity } from '../utils/logActivity.js';
import { getMessagesForUser } from '../utils/filteredResults.js';

export const getAllMessages = async (req, res) => {
  try {
    const messages = await getMessagesForUser(req.user);
    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMessagesByQuery = async (req, res) => {
  try {
    const { case_id } = req.query;

    if (!case_id) {
      return res.status(400).json({ message: 'Missing case_id query parameter' });
    }

    const messages = await db.messages.getMessagesForCase(case_id);

    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages by query:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const item = await db.messages.getMessageById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch message' });
  }
};

export const createMessage = async (req, res) => {
  try {
    const newItem = await db.messages.createMessage(req.body);
    await logActivity({
      user_id: req.user._id,
      action: 'create',
      entity_type: 'message',
      entity_id: newItem._id,
      details: `Created new message: ${newItem._id}`,
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create message' });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const updated = await db.messages.updateMessage(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Message not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'update',
      entity_type: 'message',
      entity_id: req.params.id,
      details: `Updated message: ${req.params.id}`,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update message' });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const deleted = await db.messages.deleteMessage(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    await logActivity({
      user_id: req.user._id,
      action: 'delete',
      entity_type: 'message',
      entity_id: req.params.id,
      details: `Deleted message: ${req.params.id}`,
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete message' });
  }
};
