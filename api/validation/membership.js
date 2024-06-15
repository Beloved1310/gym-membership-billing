const Joi = require("joi")

const gymServices = [
  "Personal Training",
  "Group Classes",
  "Swimming Pool",
  "Sauna",
  "Massage Therapy",
  "Nutrition Counseling",
  "Yoga",
  "Pilates",
  "Child Care",
  "Tanning"
];

 const userValidation = {
  create: Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    membershipType: Joi.string().valid('Annual Basic', 'Monthly Premium', "Annual Premium", "Monthly Basic" ).required(),  
    email: Joi.string().email().required(),
    isFirstMonth: Joi.boolean().optional(),
    startDate: Joi.string().required(),
    addOnService: Joi.boolean().required(),
    serviceName: Joi.string().valid(...gymServices).when('addOnService', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional()
    })
  })
};
module.exports = userValidation