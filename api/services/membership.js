const membershipRepository = require("../repository/membership");
const addOnService = require("./addOnService");
const AddOnServiceService = require("./addOnService");
const InvoiceService = require("./invoice");

const membershipAmount = {
  "Annual Basic": 500,
  "Monthly Premium": 50,
  "Annual Premium": 800,
  "Monthly Basic": 30,
};

class MembershipService {
  async createMembership(data) {
    const { serviceName: addOnServiceName } = data;
    let startDate = new Date(data.startDate);
    let dueDate = new Date(startDate);
    let amount = membershipAmount[data.membershipType];

    if (data.membershipType.startsWith("Annual")) {
      dueDate.setFullYear(dueDate.getFullYear() + 1);
    } else if (data.membershipType.startsWith("Monthly")) {
      dueDate.setMonth(dueDate.getMonth() + 1);
    }

    data.dueDate = dueDate;
    data.totalAmount = amount;

    const member = await membershipRepository.createMembership(data);
    if (addOnService) {
      const addServiceData = {
        serviceName: addOnServiceName,
        membershipId: member.membershipId,
       startDate
      };
      await AddOnServiceService.createAddOnService(addServiceData);
      data.amount = data.totalAmount + addOnService.monthlyAmount;
    }
    await InvoiceService.createInvoice({
      membershipId: member.membershipId,
      invoiceDateTime: dueDate,
      totalAmount: data.amount,
      invoiceUID: "https://lovecrewar.best/product_details/28927099.html"
    });
    return member
  }

}

module.exports = new MembershipService();
