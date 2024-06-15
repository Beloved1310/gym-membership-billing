const membershipRepository = require("../repository/membership");
const addOnService = require("./addOnService");
const AddOnServiceService = require("./addOnService");

const membershipAmount = {
  "Annual Basic": 500,
  "Monthly Premium": 50,
  "Annual Premium": 800,
  "Monthly Basic": 30,
};

class MembershipService {
  async createMembership(data) {
    let dueDate = new Date();
    let amount = membershipAmount[data.membershipType];

    if (data.membershipType.startsWith("Annual")) {
      dueDate.setFullYear(dueDate.getFullYear() + 1);
    } else if (data.membershipType.startsWith("Monthly")) {
      dueDate.setMonth(dueDate.getMonth() + 1);
    }

    data.dueDate = dueDate;
    data.amount = amount;

    console.log("Modified data:", data);
    const member = await addOnServiceRepository.create(data);
    if (addOnService) {
      const addServiceData = {
        serviceName: data.serviceName,
        membershipId: member.id,
      };
      await AddOnServiceService.createAddOnService(addServiceData);
    }
  }

//  createInvoice
}

module.exports = new MembershipService();
