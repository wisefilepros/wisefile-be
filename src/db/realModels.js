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

// User
export const createUser = (data) => User.create(data);
export const getUserById = (id) => User.findById(id);
export const getUserByEmail = (email) => User.findOne({ email });
export const getAllUsers = () => User.find();
export const updateUser = (id, updates) => User.findByIdAndUpdate(id, updates, { new: true });
export const deleteUser = (id) => User.findByIdAndDelete(id);

// Password
export const createPassword = (data) => Password.create(data);
export const getPasswordByUserId = (userId) => Password.findOne({ user_id: userId });
export const updatePassword = (id, updates) => Password.findByIdAndUpdate(id, updates, { new: true });
export const deletePassword = (id) => Password.findByIdAndDelete(id);

// RefreshToken
export const createRefreshToken = (data) => RefreshToken.create(data);
export const getRefreshTokenByUserId = (userId) => RefreshToken.findOne({ user_id: userId });
export const updateRefreshTokenByUserId = (userId, updates) =>
  RefreshToken.findOneAndUpdate({ user_id: userId }, updates, { new: true });
export const deleteRefreshToken = (userId) => RefreshToken.findOneAndDelete({ user_id: userId });

// Client
export const createClient = (data) => Client.create(data);
export const getClientById = (id) => Client.findById(id);
export const getAllClients = () => Client.find();
export const updateClient = (id, updates) => Client.findByIdAndUpdate(id, updates, { new: true });
export const deleteClient = (id) => Client.findByIdAndDelete(id);

// Property
export const createProperty = (data) => Property.create(data);
export const getPropertyById = (id) => Property.findById(id);
export const getAllProperties = () => Property.find();
export const updateProperty = (id, updates) => Property.findByIdAndUpdate(id, updates, { new: true });
export const deleteProperty = (id) => Property.findByIdAndDelete(id);

// Tenant
export const createTenant = (data) => Tenant.create(data);
export const getTenantById = (id) => Tenant.findById(id);
export const getAllTenants = () => Tenant.find();
export const updateTenant = (id, updates) => Tenant.findByIdAndUpdate(id, updates, { new: true });
export const deleteTenant = (id) => Tenant.findByIdAndDelete(id);

// CaseRecord
export const createCaseRecord = (data) => CaseRecord.create(data);
export const getCaseRecordById = (id) => CaseRecord.findById(id);
export const getAllCaseRecords = () => CaseRecord.find();
export const updateCaseRecord = (id, updates) => CaseRecord.findByIdAndUpdate(id, updates, { new: true });
export const deleteCaseRecord = (id) => CaseRecord.findByIdAndDelete(id);

// Document
export const createDocument = (data) => Document.create(data);
export const getDocumentById = (id) => Document.findById(id);
export const getAllDocuments = () => Document.find();
export const updateDocument = (id, updates) => Document.findByIdAndUpdate(id, updates, { new: true });
export const deleteDocument = (id) => Document.findByIdAndDelete(id);

// Message
export const createMessage = (data) => Message.create(data);
export const getMessageById = (id) => Message.findById(id);
export const getAllMessages = () => Message.find();
export const updateMessage = (id, updates) => Message.findByIdAndUpdate(id, updates, { new: true });
export const deleteMessage = (id) => Message.findByIdAndDelete(id);

// Fee
export const createFee = (data) => Fee.create(data);
export const getFeeById = (id) => Fee.findById(id);
export const getAllFees = () => Fee.find();
export const updateFee = (id, updates) => Fee.findByIdAndUpdate(id, updates, { new: true });
export const deleteFee = (id) => Fee.findByIdAndDelete(id);

// Invoice
export const createInvoice = (data) => Invoice.create(data);
export const getInvoiceById = (id) => Invoice.findById(id);
export const getAllInvoices = () => Invoice.find();
export const updateInvoice = (id, updates) => Invoice.findByIdAndUpdate(id, updates, { new: true });
export const deleteInvoice = (id) => Invoice.findByIdAndDelete(id);

// ActivityLog
export const createActivityLog = (data) => ActivityLog.create(data);
export const getActivityLogById = (id) => ActivityLog.findById(id);
export const getAllActivityLogs = () => ActivityLog.find();
export const updateActivityLog = (id, updates) => ActivityLog.findByIdAndUpdate(id, updates, { new: true });
export const deleteActivityLog = (id) => ActivityLog.findByIdAndDelete(id);