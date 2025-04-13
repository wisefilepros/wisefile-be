import { db } from '../db/index.js';
import { format } from 'date-fns';
import { Parser } from 'json2csv';
import ExcelJS from 'exceljs';

export const exportCaseAnalytics = async (req, res) => {
  try {
    const user = req.user;
    const formatType = req.query.format || 'csv';
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
            fileType: caseRecord.type,
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
            fileType: caseRecord.type,
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

    if (formatType === 'csv') {
      const parser = new Parser();
      const csv = parser.parse(result);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=analytics.csv'
      );
      return res.status(200).end(csv);
    }

    if (formatType === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Analytics');

      const columns = Object.keys(result[0] || {}).map((key) => ({
        header: key,
        key,
      }));

      sheet.columns = columns;
      sheet.addRows(result);

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=analytics.xlsx'
      );

      await workbook.xlsx.write(res);
      return res.end();
    }

    return res.status(400).json({ message: 'Unsupported format' });
  } catch (err) {
    console.error('Export failed:', err);
    res.status(500).json({ message: 'Failed to export analytics' });
  }
};
