import joi from 'joi';

const feedbackValidation = joi.object ({
  userId: joi.number().integer().positive().required(),
  propertyId: joi.number().integer().positive().required(),
  rating: joi.number().min(1).max(5).precision(1).required(),
  comment: joi.string().optional()
});
  
const validateFeedback = (data: any) => {
  return feedbackValidation.validate(data, { abortEarly: false });
}
  
export { validateFeedback };