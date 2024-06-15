const addOnServiceService = require('../services/addOnServiceService');

class AddOnServiceController {
    async createAddOnService(req, res) {
        try {
            const data = req.body;
            const addOnService = await addOnServiceService.createAddOnService(data);
            res.status(201).send(addOnService);
        } catch (error) {
            console.error('Error creating add-on service:', error);
            res.status(500).send({ message: 'An error occurred while creating the add-on service' });
        }
    }

    // Add other controller methods if needed
}

module.exports = new AddOnServiceController();
