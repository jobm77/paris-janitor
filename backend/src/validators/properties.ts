import joi from 'joi';

const propertyValidation = joi.object ({
  possessorId: joi.number().integer().positive().required(),
  address: joi.string().max(255).required(),
  announcement: joi.string().required(),
  pricePerNight: joi.number().positive().required(),
  availabilityCalendar: joi.object().optional()
});
  
const validateProperty = (data: any) => {
  return propertyValidation.validate(data, { abortEarly: false });
}
  
export { validateProperty };