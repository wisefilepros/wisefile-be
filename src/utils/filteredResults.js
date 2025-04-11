import { db } from '../db/index.js';

// Document filtering
export const getDocumentsForUser = async (user) => {
  if (user.role === 'admin') {
    return db.getAllDocuments();
  }

  const allDocs = await db.getAllDocuments();

  if (user.role === 'client') {
    return allDocs.filter((doc) => doc.client_id === user.client_id);
  }

  const cases = await db.getAllCaseRecords();
  const userCaseIds = cases
    .filter(
      (c) =>
        (user.role === 'operations' && c.operator_id === user._id) ||
        (user.role === 'attorney' && c.attorney_id === user._id)
    )
    .map((c) => c._id);

  return allDocs.filter((doc) => userCaseIds.includes(doc.case_id));
};

// Invoice filtering (no attorneys)
export const getInvoicesForUser = async (user) => {
  if (user.role === 'admin') {
    return db.getAllInvoices();
  }

  const allInvoices = await db.getAllInvoices();

  if (user.role === 'client') {
    return allInvoices.filter((inv) => inv.client_id === user.client_id);
  }

  if (user.role === 'operations') {
    const cases = await db.getAllCaseRecords();
    const caseIds = cases
      .filter((c) => c.operator_id === user._id)
      .map((c) => c._id);
    return allInvoices.filter((inv) => caseIds.includes(inv.case_id));
  }

  return [];
};

// CaseRecord filtering
export const getCaseRecordsForUser = async (user) => {
  const allCases = await db.getAllCaseRecords();

  if (user.role === 'admin') return allCases;
  if (user.role === 'client')
    return allCases.filter((c) => c.client_id === user.client_id);
  if (user.role === 'operations')
    return allCases.filter((c) => c.operator_id === user._id);
  if (user.role === 'attorney')
    return allCases.filter((c) => c.attorney_id === user._id);

  return [];
};

// Message filtering
export const getMessagesForUser = async (user) => {
  const allMessages = await db.getAllMessages();

  if (user.role === 'admin') return allMessages;
  return allMessages.filter((msg) => msg.recipient_ids.includes(user._id));
};

// User filtering
export const getUsersForUser = async (user) => {
  const allUsers = await db.getAllUsers();

  if (user.role === 'admin') return allUsers;
  if (user.role === 'client')
    return allUsers.filter((u) => u.client_id === user.client_id);

  return [];
};

// Property filtering (admin + client only)
export const getPropertiesForUser = async (user) => {
  const allProps = await db.getAllProperties();

  if (user.role === 'admin') return allProps;
  if (user.role === 'client')
    return allProps.filter((p) => p.client_id === user.client_id);

  return [];
};

// Tenant filtering (admin + client only)
export const getTenantsForUser = async (user) => {
  const allTenants = await db.getAllTenants();

  if (user.role === 'admin') return allTenants;
  if (user.role === 'client')
    return allTenants.filter((t) => t.client_id === user.client_id);

  return [];
};

// Activity Log filtering
export const getActivityLogsForUser = async (user) => {
  const allLogs = await db.getAllActivityLogs();

  if (user.role === 'admin') return allLogs;

  if (user.role === 'operations') {
    const cases = await db.getAllCaseRecords();
    const caseIds = cases
      .filter((c) => c.operator_id === user._id)
      .map((c) => c._id);

    return allLogs.filter(
      (log) =>
        (log.entity_type === 'caserecord' && caseIds.includes(log.entity_id)) ||
        log.entity_type === 'invoice' ||
        log.entity_type === 'document'
    );
  }

  if (user.role === 'client') {
    const allUsers = await db.getAllUsers();
    const userIds = allUsers
      .filter((u) => u.client_id === user.client_id)
      .map((u) => u._id);

    const allCases = await db.getAllCaseRecords();
    const caseIds = allCases
      .filter((c) => c.client_id === user.client_id)
      .map((c) => c._id);

    const allProps = await db.getAllProperties();
    const propIds = allProps
      .filter((p) => p.client_id === user.client_id)
      .map((p) => p._id);

    const allTenants = await db.getAllTenants();
    const tenantIds = allTenants
      .filter((t) => t.client_id === user.client_id)
      .map((t) => t._id);

    const allDocs = await db.getAllDocuments();
    const docIds = allDocs
      .filter((d) => d.client_id === user.client_id)
      .map((d) => d._id);

    const allInvoices = await db.getAllInvoices();
    const invoiceIds = allInvoices
      .filter((i) => i.client_id === user.client_id)
      .map((i) => i._id);

    return allLogs.filter(
      (log) =>
        (log.entity_type === 'user' && userIds.includes(log.entity_id)) ||
        (log.entity_type === 'caserecord' && caseIds.includes(log.entity_id)) ||
        (log.entity_type === 'property' && propIds.includes(log.entity_id)) ||
        (log.entity_type === 'tenant' && tenantIds.includes(log.entity_id)) ||
        (log.entity_type === 'document' && docIds.includes(log.entity_id)) ||
        (log.entity_type === 'invoice' && invoiceIds.includes(log.entity_id))
    );
  }

  return [];
};
