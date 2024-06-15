const { AddOnService } = require('../models/index');

class AddOnServiceRepository {
    async create(data) {
        return await AddOnService.create(data);
    }

    // Add other database interaction methods if needed
}

module.exports = new AddOnServiceRepository();
