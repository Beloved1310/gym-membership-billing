const invoiceRepository = require('../models/invoiceRepository');

class InvoiceService {
    async createInvoice(data) {
        return await invoiceRepository.create(data);
    }

    // Add other business logic methods if needed
}

module.exports = new InvoiceService();
