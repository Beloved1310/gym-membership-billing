const invoiceService = require('../services/invoiceService');

class InvoiceController {
    async createInvoice(req, res) {
        const data = req.body;
        const invoice = await invoiceService.createInvoice(data);
        res.status(201).send(invoice);
    }

    // Add other controller methods if needed
}

module.exports = new InvoiceController();
