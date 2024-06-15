const { Invoice } = require('./index');

class InvoiceRepository {
    async create(data) {
        return await Invoice.create(data);
    }

    // Add other database interaction methods if needed
}

module.exports = new InvoiceRepository();
