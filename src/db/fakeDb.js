import { v4 as uuidv4 } from 'uuid';

const fakeDb = {
  caseRecords: {
    getCaseById: (id) => ({ _id: id }),
    getAllCases: () => [],
    getCaseDetail: (id) => ({
      _id: id,
      documents: [],
      fees: [],
      invoices: [],
      dropdowns: { statusOptions: [], attorneys: [], operators: [] },
    }),
    createCaseRecord: (data) => ({
      ...data,
      _id: uuidv4(),
      rentFeesClaims: {
        ...(data.rentFeesClaims || {}),
        miscDebts: (data.rentFeesClaims?.miscDebts || []).map((debt) => ({
          _id: uuidv4(),
          ...debt,
        })),
      },
    }),
    updateCaseRecord: (id, updates) => ({ _id: id, ...updates }),
    deleteCaseRecord: (id) => ({ _id: id }),
  },
  users: {
    createUser: (data) => ({ ...data, _id: uuidv4() }),
    getUserById: (id) => ({ _id: id }),
    getUserByEmail: (email) => ({ email }),
    getAllUsers: () => [],
    updateUser: (id, updates) => ({ _id: id, ...updates }),
    deleteUser: (id) => ({ _id: id }),
  },
  passwords: {
    createPassword: (data) => ({ ...data, _id: uuidv4() }),
    getPasswordByUserId: (userId) => ({ user_id: userId }),
    updatePassword: (id, updates) => ({ _id: id, ...updates }),
    deletePassword: (id) => ({ _id: id }),
  },
  refreshTokens: {
    createRefreshToken: (data) => ({ ...data, _id: uuidv4() }),
    getRefreshTokenByUserId: (userId) => ({ user_id: userId }),
    updateRefreshTokenByUserId: (userId, updates) => ({
      user_id: userId,
      ...updates,
    }),
    deleteRefreshToken: (userId) => ({ user_id: userId }),
  },
  clients: {
    createClient: (data) => ({
      ...data,
      _id: uuidv4(),
      management_companies: (data.management_companies || []).map((mc) => ({
        _id: uuidv4(), // ← generate subdoc _id manually
        ...mc,
      })),
    }),
    getClientById: (id) => ({ _id: id }),
    getAllClients: () => [],
    updateClient: (id, updates) => ({ _id: id, ...updates }),
    deleteClient: (id) => ({ _id: id }),
  },
  properties: {
    createProperty: (data) => ({ ...data, _id: uuidv4() }),
    getPropertyById: (id) => ({ _id: id }),
    getAllProperties: () => [],
    updateProperty: (id, updates) => ({ _id: id, ...updates }),
    deleteProperty: (id) => ({ _id: id }),
  },
  tenants: {
    createTenant: (data) => ({ ...data, _id: uuidv4() }),
    getTenantById: (id) => ({ _id: id }),
    getAllTenants: () => [],
    updateTenant: (id, updates) => ({ _id: id, ...updates }),
    deleteTenant: (id) => ({ _id: id }),
  },
  documents: {
    createDocument: (data) => ({ ...data, _id: uuidv4() }),
    getDocumentById: (id) => ({ _id: id }),
    getAllDocuments: () => [],
    updateDocument: (id, updates) => ({ _id: id, ...updates }),
    deleteDocument: (id) => ({ _id: id }),
  },
  messages: {
    createMessage: (data) => ({
      ...data,
      _id: uuidv4(),
      attachments: (data.attachments || []).map((file) => ({
        _id: uuidv4(),
        ...file,
      })),
    }),
    getMessageById: (id) => ({ _id: id }),
    getAllMessages: () => [],
    updateMessage: (id, updates) => ({ _id: id, ...updates }),
    deleteMessage: (id) => ({ _id: id }),
  },
  fees: {
    createFee: (data) => ({ ...data, _id: uuidv4() }),
    getFeeById: (id) => ({ _id: id }),
    getAllFees: () => [],
    updateFee: (id, updates) => ({ _id: id, ...updates }),
    deleteFee: (id) => ({ _id: id }),
  },
  invoices: {
    createInvoice: (data) => ({ ...data, _id: uuidv4() }),
    getInvoiceById: (id) => ({ _id: id }),
    getAllInvoices: () => [],
    updateInvoice: (id, updates) => ({ _id: id, ...updates }),
    deleteInvoice: (id) => ({ _id: id }),
  },
  activityLogs: {
    createActivityLog: (data) => ({ ...data, _id: uuidv4() }),
    getActivityLogById: (id) => ({ _id: id }),
    getAllActivityLogs: () => [],
    updateActivityLog: (id, updates) => ({ _id: id, ...updates }),
    deleteActivityLog: (id) => ({ _id: id }),
  },
};

export default fakeDb;
