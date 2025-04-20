import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env.js';
import { connectToMongo } from './config/connecToMongo.js';
import { initAdminUser } from './config/initAdminUser.js';

// Route Imports
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import caseRecordRoutes from './routes/caseRecordRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import tenantRoutes from './routes/tenantRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import feeRoutes from './routes/feeRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import activityLogRoutes from './routes/activityLogRoutes.js';
import utilsRoutes from './routes/utilsRoutes.js';
import healthRoutes from './routes/health.js';

const app = express();

// Middleware
app.use(
  cors({
    origin: 'https://wisefile.vercel.app',
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
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/cases', caseRecordRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/activity-logs', activityLogRoutes);
app.use('/api/utils', utilsRoutes);
app.use('/api/health', healthRoutes);

// Start server
const startServer = async () => {
  if (config.env === 'production' && config.mongoUri) {
    await connectToMongo();
    await initAdminUser();
  } else {
    console.warn(
      '⚠️ Skipping Mongo connection — using fakeDb in development mode.'
    );
    await initAdminUser();
  }

  app.listen(config.port, () => {
    console.log(
      `Server running at http://localhost:${config.port} in ${config.env} mode`
    );

    console.log(
      `DB connected: ${config.mongoUri ? 'realDb (Mongo)' : 'fakeDb'}`
    );
  });
};

startServer();
