import joi from 'joi';

const serviceValidation = joi.object({
  name: joi.string().max(255).required(),
  description: joi.string().required(),
  price: joi.number().positive().required(),
  category: joi.string().valid('Petit-déjeuner', 'Visite', 'Transport', 'Expérience').required(),
  isBooked: joi.boolean().optional()
})

const validateService = (data: any) => {
  return serviceValidation.validate(data, { abortEarly: false });
}

export { validateService };