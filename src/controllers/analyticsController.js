import { db } from '../db/index.js';
import { format } from 'date-fns';

export const getCaseAnalytics = async (req, res) => {
  try {
    const user = req.user;
    let result = [];

    const cases = await db.getAllCaseRecords();
    const properties = await db.getAllProperties();
    const clients = await db.getAllClients();

    if (user.role === 'admin') {
      const invoices = await db.getAllInvoices();
      result = invoices
        .map((invoice) => {
          const caseRecord = cases.find((c) => c._id === invoice.case_id);
          if (!caseRecord) return null;

          const property = properties.find(
            (p) => p._id === caseRecord.property_id
          );
          const client = clients.find((cl) => cl._id === caseRecord.client_id);

          return {
            caseNumber: caseRecord.case_number,
            fileType:
              typeof caseRecord?.type === 'string'
                ? caseRecord.type[0].toUpperCase() + caseRecord.type.slice(1)
                : 'Unknown',
            address: property?.formatted_address || 'N/A',
            state: property?.state || 'N/A',
            client: client?.display_name || 'N/A',
            revenue: invoice.amount,
            month: format(new Date(invoice.issued_date), 'MMM'),
          };
        })
        .filter(Boolean);
    } else if (user.role === 'client') {
      const fees = await db.getAllFees();
      const userClientId = user.client_id;

      result = fees
        .filter((fee) => {
          const caseRecord = cases.find((c) => c._id === fee.case_id);
          return caseRecord?.client_id === userClientId;
        })
        .map((fee) => {
          const caseRecord = cases.find((c) => c._id === fee.case_id);
          const property = properties.find(
            (p) => p._id === caseRecord.property_id
          );
          const client = clients.find((cl) => cl._id === caseRecord.client_id);

          return {
            caseNumber: caseRecord.case_number,
            fileType:
              typeof caseRecord?.type === 'string'
                ? caseRecord.type[0].toUpperCase() + caseRecord.type.slice(1)
                : 'Unknown',
            address: property?.formatted_address || 'N/A',
            state: property?.state || 'N/A',
            client: client?.display_name || 'N/A',
            revenue: fee.amount,
            month: format(new Date(fee.created_at), 'MMM'),
          };
        });
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Failed to generate analytics:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
