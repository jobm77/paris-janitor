import joi from 'joi';

const bookingValidation = joi.object ({
  userId: joi.number().integer().positive().required(),
  propertyId: joi.number().integer().positive().required(),
  startDate: joi.date().required(),
  endDate: joi.date().min(joi.ref('startDate')).required(),
  status: joi.string().valid('pending', 'confirmed', 'cancelled').required(),
});
  
const validateBooking = (data: any) => {
  return bookingValidation.validate(data, { abortEarly: false });
}
  
  export { validateBooking };