import { db } from '../db/index.js';

// Document filtering
export const getDocumentsForUser = async (user) => {
  if (user.role === 'admin') return db.documents.getAllDocuments();

  const allDocs = await db.documents.getAllDocuments();

  if (user.role === 'client') {
    const clientId =
      typeof user.client_id === 'object' ? user.client_id?._id : user.client_id;
    return allDocs.filter((doc) => {
      const dClient = doc?.client_id;
      if (!dClient || typeof dClient !== 'object' || !dClient._id) return false;
      return String(dClient._id) === String(clientId);
    });
  }

  const cases = await db.caseRecords.getAllCases();
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
  if (user.role === 'admin') return db.invoices.getAllInvoices();

  const allInvoices = await db.invoices.getAllInvoices();

  if (user.role === 'client') {
    const clientId =
      typeof user.client_id === 'object' ? user.client_id?._id : user.client_id;
    return allInvoices.filter((inv) => {
      const iClient = inv?.client_id;
      if (!iClient || typeof iClient !== 'object' || !iClient._id) return false;
      return String(iClient._id) === String(clientId);
    });
  }

  if (user.role === 'operations') {
    const cases = await db.caseRecords.getAllCases();
    const caseIds = cases
      .filter((c) => c.operator_id === user._id)
      .map((c) => c._id);
    return allInvoices.filter((inv) => caseIds.includes(inv.case_id));
  }

  return [];
};

// CaseRecord filtering
export const getCaseRecordsForUser = async (user) => {
  const allCases = await db.caseRecords.getAllCases();

  if (user.role === 'admin') return allCases;
  if (user.role === 'client') {
    const clientId =
      typeof user.client_id === 'object' ? user.client_id?._id : user.client_id;
    return allCases.filter((c) => {
      const cClient = c?.client_id;
      if (!cClient || typeof cClient !== 'object' || !cClient._id) return false;
      return String(cClient._id) === String(clientId);
    });
  }
  if (user.role === 'operations')
    return allCases.filter((c) => c.operator_id === user._id);
  if (user.role === 'attorney')
    return allCases.filter((c) => c.attorney_id === user._id);

  return [];
};

// Message filtering
export const getMessagesForUser = async (user) => {
  const allMessages = await db.messages.getAllMessages();

  if (user.role === 'admin') return allMessages;
  return allMessages.filter((msg) => msg.recipient_ids.includes(user._id));
};

// User filtering
export const getUsersForUser = async (user) => {
  const allUsers = await db.users.getAllUsers();

  if (user.role === 'admin') return allUsers;

  if (user.role === 'client') {
    const clientId =
      typeof user.client_id === 'object' ? user.client_id._id : user.client_id;

    return allUsers.filter((u) => {
      const uClient = u?.client_id;

      // Skip if client_id is missing or not an object
      if (!uClient || typeof uClient !== 'object' || !uClient._id) return false;

      return String(uClient._id) === String(clientId);
    });
  }

  return [];
};

// Property filtering (admin + client only)
export const getPropertiesForUser = async (user) => {
  const allProps = await db.properties.getAllProperties();

  if (user.role === 'admin') return allProps;
  if (user.role === 'client') {
    const clientId =
      typeof user.client_id === 'object' ? user.client_id?._id : user.client_id;
    return allProps.filter((p) => {
      const pClient = p?.client_id;
      if (!pClient || typeof pClient !== 'object' || !pClient._id) return false;
      return String(pClient._id) === String(clientId);
    });
  }

  return [];
};

// Tenant filtering (admin + client only)
export const getTenantsForUser = async (user) => {
  const allTenants = await db.tenants.getAllTenants();

  if (user.role === 'admin') return allTenants;
  if (user.role === 'client') {
    const clientId =
      typeof user.client_id === 'object' ? user.client_id?._id : user.client_id;
    return allTenants.filter((t) => {
      const tClient = t?.client_id;
      if (!tClient || typeof tClient !== 'object' || !tClient._id) return false;
      return String(tClient._id) === String(clientId);
    });
  }

  return [];
};

// Activity Log filtering
export const getActivityLogsForUser = async (user) => {
  const allLogs = await db.activityLogs.getAllActivityLogs();

  if (user.role === 'admin') return allLogs;

  if (user.role === 'operations') {
    const cases = await db.caseRecords.getAllCaseRecords();
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
    console.log(clientId)
    const clientId =
      typeof user.client_id === 'object' ? user.client_id?._id : user.client_id;

    const allUsers = await db.users.getAllUsers();
    const userIds = allUsers
      .filter((u) => {
        const uClient = u?.client_id;
        if (!uClient || typeof uClient !== 'object' || !uClient._id)
          return false;
        return String(uClient._id) === String(clientId);
      })
      .map((u) => u._id);

    const allCases = await db.caseRecords.getAllCases();
    const caseIds = allCases
      .filter((c) => {
        const cClient = c?.client_id;
        if (!cClient || typeof cClient !== 'object' || !cClient._id)
          return false;
        return String(cClient._id) === String(clientId);
      })
      .map((c) => c._id);

    const allProps = await db.properties.getAllProperties();
    const propIds = allProps
      .filter((p) => {
        const pClient = p?.client_id;
        if (!pClient || typeof pClient !== 'object' || !pClient._id)
          return false;
        return String(pClient._id) === String(clientId);
      })
      .map((p) => p._id);

    const allTenants = await db.tenants.getAllTenants();
    const tenantIds = allTenants
      .filter((t) => {
        const tClient = t?.client_id;
        if (!tClient || typeof tClient !== 'object' || !tClient._id)
          return false;
        return String(tClient._id) === String(clientId);
      })
      .map((t) => t._id);

    const allDocs = await db.documents.getAllDocuments();
    const docIds = allDocs
      .filter((d) => {
        const dClient = d?.client_id;
        if (!dClient || typeof dClient !== 'object' || !dClient._id)
          return false;
        return String(dClient._id) === String(clientId);
      })
      .map((d) => d._id);

    const allInvoices = await db.invoices.getAllInvoices();
    const invoiceIds = allInvoices
      .filter((i) => {
        const iClient = i?.client_id;
        if (!iClient || typeof iClient !== 'object' || !iClient._id)
          return false;
        return String(iClient._id) === String(clientId);
      })
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
