const { Membership } = require('../models/index');

class MembershipRepository {
    async createMembership(data) {
        return await Membership.create(data);
    }

}

module.exports = new MembershipRepository();
