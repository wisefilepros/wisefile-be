import { User } from '../models/User.js';
import { Password } from '../models/Password.js';
import { RefreshToken } from '../models/RefreshToken.js';
import { Client } from '../models/Client.js';
import { Property } from '../models/Property.js';
import { Tenant } from '../models/Tenant.js';
import { CaseRecord } from '../models/CaseRecord.js';
import { Document } from '../models/Document.js';
import { Message } from '../models/Message.js';
import { Fee } from '../models/Fee.js';
import { Invoice } from '../models/Invoice.js';
import { ActivityLog } from '../models/ActivityLog.js';
import { CASE_STATUSES } from '../utils/caseStatusOptions.js';
import { format } from 'date-fns';

// --- CASE RECORDS ---
async function getCaseById(id) {
  return CaseRecord.findById(id).lean();
}

async function getAllCases() {
  return CaseRecord.find({})
    .populate('client_id')
    .populate('tenants')
    .populate('property_id')
    .populate('attorney_id')
    .populate('operator_id')
    .populate('primary_contact_id')
    .lean();
}

async function getCaseDetail(id) {
  const caseRecord = await CaseRecord.findById(id)
    .populate('client_id')
    .populate('tenants')
    .populate('property_id')
    .populate('attorney_id')
    .populate('operator_id')
    .populate('primary_contact_id')
    .lean();

  if (!caseRecord) return null;

  const [documents, fees, invoices, attorneys, operators] = await Promise.all([
    Document.find({ case_id: id }).lean(),
    Fee.find({ case_id: id }).lean(),
    Invoice.find({ case_id: id }).lean(),
    User.find({ role: 'attorney' }).select('_id full_name').lean(),
    User.find({ role: 'operations' }).select('_id full_name').lean(),
  ]);

  const statusOptions = CASE_STATUSES;

  return {
    case: {
      ...caseRecord,
      documents,
      fees,
      invoices,
    },
    dropdowns: {
      statusOptions,
      attorneys,
      operators,
    },
  };
}

async function createCaseRecord(data) {
  return CaseRecord.create(data);
}

async function updateCaseRecord(id, updates) {
  return CaseRecord.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteCaseRecord(id) {
  return CaseRecord.findByIdAndDelete(id); // For MVP phase
  // return CaseRecord.findByIdAndUpdate(id, { is_deleted: true }, { new: true });
}

// --- USERS ---
async function createUser(data) {
  return User.create(data);
}

async function getUserById(id) {
  return User.findById(id).populate('client_id').lean();
}

async function getUserByEmail(email) {
  return User.findOne({ email }).populate('client_id').lean();
}

async function getAllUsers() {
  return User.find().populate('client_id').lean();
}

async function updateUser(id, updates) {
  return User.findByIdAndUpdate(id, updates, { new: true })
    .populate('client_id')
    .lean();
}

async function deleteUser(id) {
  return User.findByIdAndDelete(id); // For MVP phase
  //   return User.findByIdAndUpdate(id, { is_deleted: true }, { new: true });
}

// --- PASSWORDS ---
async function createPassword(data) {
  return Password.create(data);
}

async function getPasswordByUserId(userId) {
  return Password.findOne({ user_id: userId });
}

async function updatePassword(id, updates) {
  return Password.findByIdAndUpdate(id, updates, { new: true });
}

async function deletePassword(id) {
  return Password.findByIdAndDelete(id);
}

// --- REFRESH TOKENS ---
async function createRefreshToken(data) {
  return RefreshToken.create(data);
}

async function getRefreshTokenByUserId(userId) {
  return RefreshToken.findOne({ user_id: userId });
}

async function updateRefreshTokenByUserId(userId, updates) {
  return RefreshToken.findOneAndUpdate(
    { user_id: userId },
    { ...updates, updated_at: new Date() },
    { new: true }
  );
}

async function deleteRefreshToken(userId) {
  return RefreshToken.findOneAndDelete({ user_id: userId });
}

// --- CLIENTS ---
async function createClient(data) {
  return Client.create(data);
}

async function getClientById(id) {
  return Client.findById(id)
    .populate('users', 'full_name email role') // or leave empty string for full object
    .populate('management_companies.users', 'full_name email role')
    .lean();
}

async function getAllClients() {
  return Client.find()
    .populate('users', 'full_name email role')
    .populate('management_companies.users', 'full_name email role')
    .lean();
}

async function updateClient(id, updates) {
  return Client.findByIdAndUpdate(id, updates, { new: true }).lean();
}

async function deleteClient(id) {
  return Client.findByIdAndDelete(id); // For MVP phase
  //   return Client.findByIdAndUpdate(id, { is_deleted: true }, { new: true }).lean();
}

// --- PROPERTIES ---
async function createProperty(data) {
  return Property.create(data);
}

async function getPropertyById(id) {
  return Property.findById(id)
    .populate('client_id')
    .populate('management_company_id')
    .populate('associated_tenants')
    .lean();
}

async function getAllProperties() {
  return Property.find()
    .populate('client_id')
    .populate('management_company_id')
    .populate('associated_tenants')
    .lean();
}

async function updateProperty(id, updates) {
  return Property.findByIdAndUpdate(id, updates, { new: true }).lean();
}

async function deleteProperty(id) {
  return Property.findByIdAndDelete(id);
}

// --- TENANTS ---
async function createTenant(data) {
  return Tenant.create(data);
}

async function getTenantById(id) {
  return Tenant.findById(id)
    .populate('client_id')
    .populate('associated_properties')
    .lean();
}

async function getAllTenants() {
  return Tenant.find()
    .populate('client_id')
    .populate('associated_properties')
    .lean();
}

async function updateTenant(id, updates) {
  return Tenant.findByIdAndUpdate(id, updates, { new: true }).lean();
}

async function deleteTenant(id) {
  return Tenant.findByIdAndDelete(id);
}

// --- DOCUMENTS ---
async function createDocument(data) {
  return Document.create(data);
}

async function getDocumentById(id) {
  return Document.findById(id)
    .populate('uploaded_by', 'full_name')
    .populate('client_id')
    .populate('case_id')
    .lean();
}

async function getAllDocuments() {
  return Document.find()
    .populate('uploaded_by', 'full_name')
    .populate('client_id')
    .populate('case_id')
    .lean();
}

async function updateDocument(id, updates) {
  return Document.findByIdAndUpdate(id, updates, { new: true }).lean();
}

async function deleteDocument(id) {
  return Document.findByIdAndDelete(id);
}

// --- MESSAGES ---
async function createMessage(data) {
  return Message.create(data);
}

async function getMessageById(id) {
  return Message.findById(id)
    .populate('sender_id', 'full_name')
    .populate('recipient_ids', 'full_name')
    .populate('read_by', 'full_name')
    .populate('case_id')
    .lean();
}

async function getMessagesByQuery(caseId) {
  return Message.find({
    case_id: caseId,
    visible_to_users: { $ne: false },
  })
    .populate('sender_id', 'full_name')
    .populate('recipient_ids', 'full_name')
    .populate('read_by', 'full_name')
    .lean();
}

async function getAllMessages() {
  return Message.find()
    .populate('sender_id', 'full_name')
    .populate('recipient_ids', 'full_name')
    .populate('read_by', 'full_name')
    .populate('case_id')
    .lean();
}

async function updateMessage(id, updates) {
  return Message.findByIdAndUpdate(id, updates, { new: true }).lean();
}

async function deleteMessage(id) {
  return Message.findByIdAndDelete(id);
}

// --- FEE ---
async function createFee(data) {
  return Fee.create(data);
}

async function getFeeById(id) {
  return Fee.findById(id).populate('client_id').populate('case_id').lean();
}

async function getAllFees() {
  return Fee.find().populate('client_id').populate('case_id').lean();
}

async function updateFee(id, updates) {
  return Fee.findByIdAndUpdate(id, updates, { new: true }).lean();
}

async function deleteFee(id) {
  return Fee.findByIdAndDelete(id);
}

// --- INVOICES ---
async function createInvoice(data) {
  return Invoice.create(data);
}

async function getInvoiceById(id) {
  return Invoice.findById(id)
    .populate('client_id')
    .populate('case_id')
    .populate('associated_fees')
    .lean();
}

async function getAllInvoices() {
  return Invoice.find()
    .populate('client_id')
    .populate('case_id')
    .populate('associated_fees')
    .lean();
}

async function updateInvoice(id, updates) {
  return Invoice.findByIdAndUpdate(id, updates, { new: true }).lean();
}

async function deleteInvoice(id) {
  return Invoice.findByIdAndDelete(id);
}

// --- ACTIVITY LOGS ---
async function createActivityLog(data) {
  return ActivityLog.create(data);
}

async function getActivityLogById(id) {
  return ActivityLog.findById(id).populate('user_id', 'full_name').lean();
}

async function getAllActivityLogs() {
  return ActivityLog.find().populate('user_id', 'full_name').lean();
}

async function updateActivityLog(id, updates) {
  return ActivityLog.findByIdAndUpdate(id, updates, { new: true }).lean();
}

async function deleteActivityLog(id) {
  return ActivityLog.findByIdAndDelete(id);
}

// --- ANALYTICS ---

export async function getAnalyticsSummaryForUser(user) {
  const isAdmin = user.role === 'admin';

  const caseFilters = isAdmin ? {} : { client_id: user.client_id };
  const feeFilters = isAdmin ? {} : { client_id: user.client_id };

  const [cases, fees, properties, clients] = await Promise.all([
    CaseRecord.find(caseFilters).lean(),
    Fee.find(feeFilters).lean(),
    Property.find().lean(),
    Client.find().lean(),
  ]);

  const propertyMap = Object.fromEntries(
    properties.map((p) => [p._id.toString(), p])
  );
  const clientMap = Object.fromEntries(
    clients.map((c) => [c._id.toString(), c])
  );
  const caseMap = Object.fromEntries(cases.map((c) => [c._id.toString(), c]));

  const monthlyRevenue = {};
  const fileAnalytics = [];

  for (const fee of fees) {
    const caseRecord = caseMap[fee.case_id?.toString()];
    if (!caseRecord) continue;

    const property = propertyMap[caseRecord.property_id?.toString()];
    const client = clientMap[caseRecord.client_id?.toString()];

    const month = format(new Date(fee.created_at), 'MMM');
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + fee.amount;

    fileAnalytics.push({
      caseNumber: caseRecord.case_number,
      fileType:
        caseRecord.type?.charAt(0).toUpperCase() + caseRecord.type?.slice(1),
      address: property?.formatted_address || 'N/A',
      state: property?.state || 'N/A',
      client: client?.display_name || 'N/A',
      revenue: fee.amount,
      month,
    });
  }

  return {
    monthlyRevenue,
    fileAnalytics,
  };
}

export const caseRecords = {
  getCaseById,
  getAllCases,
  getCaseDetail,
  createCaseRecord,
  updateCaseRecord,
  deleteCaseRecord,
};
export const users = {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
};
export const passwords = {
  createPassword,
  getPasswordByUserId,
  updatePassword,
  deletePassword,
};
export const refreshTokens = {
  createRefreshToken,
  getRefreshTokenByUserId,
  updateRefreshTokenByUserId,
  deleteRefreshToken,
};
export const clients = {
  createClient,
  getClientById,
  getAllClients,
  updateClient,
  deleteClient,
};
export const properties = {
  createProperty,
  getPropertyById,
  getAllProperties,
  updateProperty,
  deleteProperty,
};
export const tenants = {
  createTenant,
  getTenantById,
  getAllTenants,
  updateTenant,
  deleteTenant,
};
export const documents = {
  createDocument,
  getDocumentById,
  getAllDocuments,
  updateDocument,
  deleteDocument,
};
export const messages = {
  createMessage,
  getMessageById,
  getMessagesByQuery,
  getAllMessages,
  updateMessage,
  deleteMessage,
};
export const fees = {
  createFee,
  getFeeById,
  getAllFees,
  updateFee,
  deleteFee,
};
export const invoices = {
  createInvoice,
  getInvoiceById,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
};
export const activityLogs = {
  createActivityLog,
  getActivityLogById,
  getAllActivityLogs,
  updateActivityLog,
  deleteActivityLog,
};

const realDb = {
  caseRecords,
  users,
  passwords,
  refreshTokens,
  clients,
  properties,
  tenants,
  documents,
  messages,
  fees,
  invoices,
  activityLogs,
};

export default realDb;
