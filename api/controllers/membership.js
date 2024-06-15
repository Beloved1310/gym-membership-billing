const membershipService = require('../services/membership');
const userValidation = require('../validation/membership');

class MembershipController {
    async createMembership(req, res) {
        try {
            const { value, error } = userValidation.create.validate(req.body);
            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }

            const membership = await membershipService.createMembership(value);
            res.status(201).send(membership);
        } catch (err) {
            console.error('Error creating membership:', err);
            res.status(500).send({ message: 'An error occurred while creating the membership' });
        }
    }
}

module.exports = new MembershipController();
