const { Invoice } = require('../models/index');

class InvoiceRepository {
    async create(data) {
        return await Invoice.create(data);
    }
}

module.exports = new InvoiceRepository();
