import joi from 'joi';

const documentValidation = joi.object ({
  userId: joi.number().integer().positive().required(),
  url: joi.string().uri().optional(),
  name: joi.string().required(),
  content: joi.string().required(),
  type: joi.string().valid('inspection', 'invoice', 'quote').required(),
});
  
const validateDocument = (data: any) => {
  return documentValidation.validate(data, { abortEarly: false });
}
  
export { validateDocument };