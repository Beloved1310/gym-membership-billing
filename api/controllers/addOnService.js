const addOnServiceService = require('../services/addOnServiceService');

class AddOnServiceController {
    async createAddOnService(req, res) {
        const data = req.body;
        const addOnService = await addOnServiceService.createAddOnService(data);
        res.status(201).send(addOnService);
    }

    // Add other controller methods if needed
}

module.exports = new AddOnServiceController();
