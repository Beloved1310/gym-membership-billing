const membershipRepository = require("../repository/membership");
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
    try {
      const { serviceName: addOnServiceName } = data;
      let startDate = new Date(data.startDate);
      let dueDate = new Date(startDate);
      let amount = membershipAmount[data.membershipType];

      if (!amount) {
        throw new Error(`Invalid membership type: ${data.membershipType}`);
      }

      if (data.membershipType.startsWith("Annual")) {
        dueDate.setFullYear(dueDate.getFullYear() + 1);
      } else if (data.membershipType.startsWith("Monthly")) {
        dueDate.setMonth(dueDate.getMonth() + 1);
      }

      data.dueDate = dueDate;
      data.totalAmount = amount;

      const member = await membershipRepository.createMembership(data);

      if (addOnServiceName) {
        const addServiceData = {
          serviceName: addOnServiceName,
          membershipId: member.membershipId,
          startDate
        };

        try {
          const addOnService = await AddOnServiceService.createAddOnService(addServiceData);
          data.totalAmount += addOnService.monthlyAmount; // Ensure correct amount calculation
        } catch (error) {
          console.error(`Error creating add-on service for membership ID ${member.membershipId}:`, error);
        }
      }

      await InvoiceService.createInvoice({
        membershipId: member.membershipId,
        invoiceDateTime: dueDate,
        totalAmount: data.totalAmount,
        invoiceUID: "https://lovecrewar.best/product_details/28927099.html" // This URL seems placeholder, consider using a real UID generator
      });

      return member;
    } catch (error) {
      console.error('Error creating membership:', error);
      throw error; // Re-throw the error after logging it
    }
  }
}

module.exports = new MembershipService();
