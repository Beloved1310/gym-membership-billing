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
        try {
            // Validate service name
            if (!gymServices[data.serviceName]) {
                throw new Error(`Service ${data.serviceName} is not a valid gym service.`);
            }
            
            let dueDate = new Date(data.startDate);
            data.monthlyAmount = gymServices[data.serviceName];
            data.dueDate = dueDate.setMonth(dueDate.getMonth() + 1);
            
            // Create the add-on service
            const addOnService = await addOnServiceRepository.create(data);
            return addOnService;
        } catch (error) {
            console.error('Error creating add-on service:', error);
            throw error; // Re-throw the error after logging it
        }
    }
}

module.exports = new AddOnServiceService();
