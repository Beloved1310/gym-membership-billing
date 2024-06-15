const addOnServiceRepository = require('../repository/addOnService');

const gymServices = {
    "Personal Training": 100,
    "Group Classes": 50,
    "Swimming Pool": 40,
    "Sauna": 30,
    "Massage Therapy": 120,
    "Nutrition Counseling": 70,
    "Yoga": 60,
    "Pilates": 60,
    "Child Care": 45,
    "Tanning": 35
  };
class AddOnServiceService {
    async createAddOnService(data) {
        const dueDate = new Date()
        data.serviceName = gymServices[data.service];
        data.dueDate = dueDate.setMonth(dueDate.getMonth() + 1);
        return await addOnServiceRepository.create(data);
        // create Invoice
    }

    // Add other business logic methods if needed 
}

module.exports = new AddOnServiceService();
