const membershipService = require('../services/membership');
const  userValidation = require('../validation/membership');

class MembershipController {
    async createMembership(req, res) {
        const {value, error} = userValidation.create.validate(req.body)
        if (error) return res.status(400).send({ error: error.details[0].message })
        const membership = await membershipService.createMembership(value);
        res.status(201).send(membership);
    }

}

module.exports = new MembershipController();
