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
  users: db.users,
  getAllUsers: () => db.users,
  getUserById: (id) => db.users.find((item) => item._id === id),
  createUser: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const newItem = {
      _id,
      ...item,
      is_active: item?.is_active !== undefined ? item.is_active : true,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.users.push(newItem);
    return newItem;
  },

  clients: db.clients,
  getAllClients: () => db.clients,
  getClientById: (id) => db.clients.find((item) => item._id === id),
  createClient: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const newItem = {
      _id,
      ...item,
      is_active: item?.is_active !== undefined ? item.is_active : true,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.clients.push(newItem);
    return newItem;
  },

  properties: db.properties,
  getAllProperties: () => db.properties,
  getPropertieById: (id) => db.properties.find((item) => item._id === id),
  createPropertie: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const newItem = {
      _id,
      ...item,
      is_active: item?.is_active !== undefined ? item.is_active : true,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.properties.push(newItem);
    return newItem;
  },

  tenants: db.tenants,
  getAllTenants: () => db.tenants,
  getTenantById: (id) => db.tenants.find((item) => item._id === id),
  createTenant: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const newItem = {
      _id,
      ...item,
      is_active: item?.is_active !== undefined ? item.is_active : true,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.tenants.push(newItem);
    return newItem;
  },

  caserecords: db.caserecords,
  getAllCaserecords: () => db.caserecords,
  getCaserecordById: (id) => db.caserecords.find((item) => item._id === id),
  createCaserecord: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const newItem = {
      _id,
      ...item,
      is_active: item?.is_active !== undefined ? item.is_active : true,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.caserecords.push(newItem);
    return newItem;
  },

  documents: db.documents,
  getAllDocuments: () => db.documents,
  getDocumentById: (id) => db.documents.find((item) => item._id === id),
  createDocument: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const newItem = {
      _id,
      ...item,
      is_active: item?.is_active !== undefined ? item.is_active : true,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.documents.push(newItem);
    return newItem;
  },

  messages: db.messages,
  getAllMessages: () => db.messages,
  getMessageById: (id) => db.messages.find((item) => item._id === id),
  createMessage: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const newItem = {
      _id,
      ...item,
      is_active: item?.is_active !== undefined ? item.is_active : true,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.messages.push(newItem);
    return newItem;
  },

  fees: db.fees,
  getAllFees: () => db.fees,
  getFeeById: (id) => db.fees.find((item) => item._id === id),
  createFee: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const newItem = {
      _id,
      ...item,
      is_active: item?.is_active !== undefined ? item.is_active : true,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.fees.push(newItem);
    return newItem;
  },

  invoices: db.invoices,
  getAllInvoices: () => db.invoices,
  getInvoiceById: (id) => db.invoices.find((item) => item._id === id),
  createInvoice: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const newItem = {
      _id,
      ...item,
      is_active: item?.is_active !== undefined ? item.is_active : true,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.invoices.push(newItem);
    return newItem;
  },

  activitylogs: db.activitylogs,
  getAllActivitylogs: () => db.activitylogs,
  getActivitylogById: (id) => db.activitylogs.find((item) => item._id === id),
  createActivitylog: (item) => {
    const _id = uuidv4();
    const timestamp = new Date();
    const newItem = {
      _id,
      ...item,
      is_active: item?.is_active !== undefined ? item.is_active : true,
      created_at: timestamp,
      updated_at: timestamp,
    };
    db.activitylogs.push(newItem);
    return newItem;
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
  },
};
