const express = require('express');
const InvoiceController = require('../controllers/invoice');
const router = express.Router();
const invoiceController = new InvoiceController();

router.post('/invoice', (req, res) => invoiceController.createInvoice(req, res));

module.exports = router;
