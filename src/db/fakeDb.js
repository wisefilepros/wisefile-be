import { v4 as uuidv4 } from 'uuid';

const db = {
  users: [],
  clients: [],
  properties: [],
  tenants: [],
  caserecords: [],
  documents: [],
  messages: [],
  fees: [],
  invoices: [],
  activitylogs: [],
};

export const fakeDb = {
  // USERS
  users: db.users,
  getAllUsers: () => db.users,
  getUserById: (id) => db.users.find((item) => item._id === id),
  createUser: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const base = {
      full_name: null,
      email: null,
      role: null,
      client_id: null,
      is_active: true,
      phone_number: null,
      last_login: null,
      email_verified: false,
      two_factor_enabled: false,
      profile_picture_url: '',
      preferences: {},
      notifications: [],
    };
    const newItem = {
      _id,
      ...base,
      ...item,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.users.push(newItem);
    return newItem;
  },
  updateUser: (id, updates) => {
    const index = db.users.findIndex((item) => item._id === id);
    if (index === -1) return null;
    db.users[index] = {
      ...db.users[index],
      ...updates,
      updated_at: new Date(),
    };
    return db.users[index];
  },
  deleteUser: (id) => {
    const index = db.users.findIndex((item) => item._id === id);
    if (index === -1) return false;
    db.users.splice(index, 1);
    return true;
  },

  // CLIENTS
  clients: db.clients,
  getAllClients: () => db.clients,
  getClientById: (id) => db.clients.find((item) => item._id === id),
  createClient: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const base = {
      legal_name: null,
      display_name: null,
      phone_number: null,
      email: null,
      client_code: null,
      is_active: true,
      is_deleted: false,
      mailing_address: {},
      billing_address: {},
      physical_address: {},
      management_companies: [],
      users: [],
    };
    const newItem = {
      _id,
      ...base,
      ...item,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.clients.push(newItem);
    return newItem;
  },
  updateClient: (id, updates) => {
    const index = db.clients.findIndex((item) => item._id === id);
    if (index === -1) return null;
    db.clients[index] = {
      ...db.clients[index],
      ...updates,
      updated_at: new Date(),
    };
    return db.clients[index];
  },
  deleteClient: (id) => {
    const index = db.clients.findIndex((item) => item._id === id);
    if (index === -1) return false;
    db.clients.splice(index, 1);
    return true;
  },

  // PROPERTIES
  properties: db.properties,
  getAllProperties: () => db.properties,
  getPropertyById: (id) => db.properties.find((item) => item._id === id),
  createProperty: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const base = {
      property_code: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      formatted_address: null,
      unit_count: null,
      is_commercial: false,
      occupancy_status: null,
      is_active: true,
      management_company: null,
      associated_tenants: [],
    };
    const newItem = {
      _id,
      ...base,
      ...item,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.properties.push(newItem);
    return newItem;
  },
  updateProperty: (id, updates) => {
    const index = db.properties.findIndex((item) => item._id === id);
    if (index === -1) return null;
    db.properties[index] = {
      ...db.properties[index],
      ...updates,
      updated_at: new Date(),
    };
    return db.properties[index];
  },
  deleteProperty: (id) => {
    const index = db.properties.findIndex((item) => item._id === id);
    if (index === -1) return false;
    db.properties.splice(index, 1);
    return true;
  },

  // TENANTS
  tenants: db.tenants,
  getAllTenants: () => db.tenants,
  getTenantById: (id) => db.tenants.find((item) => item._id === id),
  createTenant: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const base = {
      full_name: null,
      first_name: null,
      last_name: null,
      associated_properties: [],
    };
    const newItem = {
      _id,
      ...base,
      ...item,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.tenants.push(newItem);
    return newItem;
  },
  updateTenant: (id, updates) => {
    const index = db.tenants.findIndex((item) => item._id === id);
    if (index === -1) return null;
    db.tenants[index] = {
      ...db.tenants[index],
      ...updates,
      updated_at: new Date(),
    };
    return db.tenants[index];
  },
  deleteTenant: (id) => {
    const index = db.tenants.findIndex((item) => item._id === id);
    if (index === -1) return false;
    db.tenants.splice(index, 1);
    return true;
  },

  // CASERECORDS
  caserecords: db.caserecords,
  getAllCaseRecords: () => db.caserecords,
  getCaseRecordById: (id) => db.caserecords.find((item) => item._id === id),
  createCaseRecord: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const base = {
      case_number: null,
      type: null,
      client_id: null,
      property_id: null,
      tenant_id: null,
      attorney_id: null,
      operator_id: null,
      primary_contact_id: null,
      status: null,
      sub_status: null,
      courtCaseNumber: null,
      courtName: null,
      court_decision: null,
      start_date: null,
      end_date: null,
      description: null,
      internal_notes: [],
    };
    const newItem = {
      _id,
      ...base,
      ...item,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.caserecords.push(newItem);
    return newItem;
  },
  updateCaseRecord: (id, updates) => {
    const index = db.caserecords.findIndex((item) => item._id === id);
    if (index === -1) return null;
    db.caserecords[index] = {
      ...db.caserecords[index],
      ...updates,
      updated_at: new Date(),
    };
    return db.caserecords[index];
  },
  deleteCaseRecord: (id) => {
    const index = db.caserecords.findIndex((item) => item._id === id);
    if (index === -1) return false;
    db.caserecords.splice(index, 1);
    return true;
  },

  // DOCUMENTS
  documents: db.documents,
  getAllDocuments: () => db.documents,
  getDocumentById: (id) => db.documents.find((item) => item._id === id),
  createDocument: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const base = {
      case_id: null,
      name: null,
      file_url: null,
      file_path: null,
      file_size: null,
      file_type: null,
      is_deleted: false,
      is_confidential: false,
      is_temporary: false,
      notes: null,
      tags: [],
      uploaded_by: null,
      uploaded_at: timestamp,
      updated_at: timestamp,
      client_id: null,
    };
    const newItem = { _id, ...base, ...item };
    db.documents.push(newItem);
    return newItem;
  },
  updateDocument: (id, updates) => {
    const index = db.documents.findIndex((item) => item._id === id);
    if (index === -1) return null;
    db.documents[index] = {
      ...db.documents[index],
      ...updates,
      updated_at: new Date(),
    };
    return db.documents[index];
  },
  deleteDocument: (id) => {
    const index = db.documents.findIndex((item) => item._id === id);
    if (index === -1) return false;
    db.documents.splice(index, 1);
    return true;
  },

  // MESSAGES
  messages: db.messages,
  getAllMessages: () => db.messages,
  getMessageById: (id) => db.messages.find((item) => item._id === id),
  createMessage: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const base = {
      case_id: null,
      content: null,
      sender_id: null,
      recipient_ids: [],
      created_at: timestamp,
      is_read: false,
      is_deleted: false,
      visible_to_users: true,
      attachments: [],
      message_type: 'text',
      read_by: [],
    };
    const newItem = { _id, ...base, ...item };
    db.messages.push(newItem);
    return newItem;
  },
  updateMessage: (id, updates) => {
    const index = db.messages.findIndex((item) => item._id === id);
    if (index === -1) return null;
    db.messages[index] = {
      ...db.messages[index],
      ...updates,
      updated_at: new Date(),
    };
    return db.messages[index];
  },
  deleteMessage: (id) => {
    const index = db.messages.findIndex((item) => item._id === id);
    if (index === -1) return false;
    db.messages.splice(index, 1);
    return true;
  },

  // FEES
  fees: db.fees,
  getAllFees: () => db.fees,
  getFeeById: (id) => db.fees.find((item) => item._id === id),
  createFee: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const base = {
      case_id: null,
      type: null,
      amount: null,
      description: null,
      status: 'pending',
      client_id: null,
    };
    const newItem = {
      _id,
      ...base,
      ...item,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.fees.push(newItem);
    return newItem;
  },
  updateFee: (id, updates) => {
    const index = db.fees.findIndex((item) => item._id === id);
    if (index === -1) return null;
    db.fees[index] = { ...db.fees[index], ...updates, updated_at: new Date() };
    return db.fees[index];
  },
  deleteFee: (id) => {
    const index = db.fees.findIndex((item) => item._id === id);
    if (index === -1) return false;
    db.fees.splice(index, 1);
    return true;
  },

  // INVOICES
  invoices: db.invoices,
  getAllInvoices: () => db.invoices,
  getInvoiceById: (id) => db.invoices.find((item) => item._id === id),
  createInvoice: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const base = {
      case_id: null,
      client_id: null,
      amount: null,
      description: null,
      issued_date: null,
      due_date: null,
      status: 'unpaid',
      notes: null,
    };
    const newItem = {
      _id,
      ...base,
      ...item,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.invoices.push(newItem);
    return newItem;
  },
  updateInvoice: (id, updates) => {
    const index = db.invoices.findIndex((item) => item._id === id);
    if (index === -1) return null;
    db.invoices[index] = {
      ...db.invoices[index],
      ...updates,
      updated_at: new Date(),
    };
    return db.invoices[index];
  },
  deleteInvoice: (id) => {
    const index = db.invoices.findIndex((item) => item._id === id);
    if (index === -1) return false;
    db.invoices.splice(index, 1);
    return true;
  },

  // ACTIVITY LOGS
  activitylogs: db.activitylogs,
  getAllActivityLogs: () => db.activitylogs,
  getActivityLogById: (id) => db.activitylogs.find((item) => item._id === id),
  createActivityLog: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const base = {
      entity_id: null,
      action: null,
      details: null,
      user_id: null,
      timestamp: timestamp,
    };
    const newItem = { _id, ...base, ...item };
    db.activitylogs.push(newItem);
    return newItem;
  },
  updateActivityLog: (id, updates) => {
    const index = db.activitylogs.findIndex((item) => item._id === id);
    if (index === -1) return null;
    db.activitylogs[index] = { ...db.activitylogs[index], ...updates };
    return db.activitylogs[index];
  },
  deleteActivityLog: (id) => {
    const index = db.activitylogs.findIndex((item) => item._id === id);
    if (index === -1) return false;
    db.activitylogs.splice(index, 1);
    return true;
  },

  // PASSWORD
  passwords: db.passwords,
  getAllPasswords: () => db.passwords,
  getPasswordById: (id) => db.passwords.find((item) => item._id === id),
  createPassword: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const base = {
      user_id: null,
      hash: null,
    };
    const newItem = {
      _id,
      ...base,
      ...item,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.passwords.push(newItem);
    return newItem;
  },
  updatePassword: (id, updates) => {
    const index = db.passwords.findIndex((item) => item._id === id);
    if (index === -1) return null;
    db.passwords[index] = {
      ...db.passwords[index],
      ...updates,
      updated_at: new Date(),
    };
    return db.passwords[index];
  },
  deletePassword: (id) => {
    const index = db.passwords.findIndex((item) => item._id === id);
    if (index === -1) return false;
    db.passwords.splice(index, 1);
    return true;
  },
  getPasswordByUserId: (user_id) => {
    return db.passwords.find((p) => p.user_id === user_id);
  },

  // REFRESH_TOKEN
  refresh_tokens: db.refresh_tokens,
  getAllRefreshTokens: () => db.refresh_tokens,
  getRefreshTokenById: (id) =>
    db.refresh_tokens.find((item) => item._id === id),
  createRefreshToken: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const base = {
      user_id: null,
      token: null,
    };
    const newItem = {
      _id,
      ...base,
      ...item,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.refresh_tokens.push(newItem);
    return newItem;
  },
  updateRefreshToken: (id, updates) => {
    const index = db.refresh_tokens.findIndex((item) => item._id === id);
    if (index === -1) return null;
    db.refresh_tokens[index] = {
      ...db.refresh_tokens[index],
      ...updates,
      updated_at: new Date(),
    };
    return db.refresh_tokens[index];
  },
  deleteRefreshToken: (id) => {
    const index = db.refresh_tokens.findIndex((item) => item._id === id);
    if (index === -1) return false;
    db.refresh_tokens.splice(index, 1);
    return true;
  },

  clearAll: () => {
    db.users = [];
    db.clients = [];
    db.properties = [];
    db.tenants = [];
    db.caserecords = [];
    db.documents = [];
    db.messages = [];
    db.fees = [];
    db.invoices = [];
    db.activitylogs = [];
    db.passwords = [];
    db.refresh_tokens = [];
  },
};
