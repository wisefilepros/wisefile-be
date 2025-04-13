import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env.js';

// Route Imports
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';
import caseRecordRoutes from './routes/caseRecordRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import tenantRoutes from './routes/tenantRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import feeRoutes from './routes/feeRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import activityLogRoutes from './routes/activityLogRoutes.js';
import utilsRoutes from './routes/utilsRoutes.js';

const app = express();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/', (req, res) => {
  res.status(200).send('WiseFile backend is running locally with fake DB.');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cases', caseRecordRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/activity-logs', activityLogRoutes);

// Utility Routes
app.use('/api/utils', utilsRoutes);

// Start server
app.listen(config.port, () => {
  console.log(
    `🚀 Server running at http://localhost:${config.port} in ${config.env} mode`
  );
});
