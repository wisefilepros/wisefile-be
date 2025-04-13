import { db } from '../db/index.js';
import { getCaseRecordsForUser } from '../utils/filteredResults.js';
import { getInvoicesForUser } from '../utils/filteredResults.js';
import { getMessagesForUser } from '../utils/filteredResults.js';
import { getActivityLogsForUser } from '../utils/filteredResults.js';

export const getDashboardMetrics = async (req, res) => {
  try {
    const user = req.user;

    const cases = await getCaseRecordsForUser(user);
    const invoices = await getInvoicesForUser(user);
    const messages = await getMessagesForUser(user);
    const activityLogs = await getActivityLogsForUser(user);

    const openCases = cases.filter(
      (c) =>
        !c.is_deleted &&
        c.status !== 'Dismissed' &&
        c.status !== 'Dismissed – Paid'
    ).length;

    const unpaidInvoices = invoices.filter(
      (i) => !i.is_deleted && i.status !== 'paid'
    ).length;

    const unreadMessages = messages.filter(
      (m) =>
        !m.is_deleted &&
        m.visible_to_users &&
        m.recipient_ids?.includes(user._id) &&
        !m.read_by?.includes(user._id)
    ).length;

    const activityLog = activityLogs
      .filter((a) => !a.is_deleted)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 20)
      .map((a) => ({
        ...a,
        action_type: a.action,
        description: a.details,
      }));

    res.status(200).json({
      openCases,
      unpaidInvoices,
      unreadMessages,
      activityLog,
    });
  } catch (err) {
    console.error('Dashboard fetch failed:', err);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};
