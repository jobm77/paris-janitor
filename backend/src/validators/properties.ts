import joi from 'joi';

const propertyValidation = joi.object({
  possessorId: joi.number().integer().positive().required(),
  address: joi.string().max(255).required(),
  announcement: joi.string().required(),
  pricePerNight: joi.number().positive().required(),
  type: joi.string().valid('Maison', 'Appartement', 'Studio', 'Chalet').required(),
  bedrooms: joi.number().integer().min(1).required(),
  bathrooms: joi.number().integer().min(1).required(),
  area: joi.number().positive().required(),
  amenities: joi.array().items(joi.string()).optional(),
  availabilityCalendar: joi.array().items(
    joi.object({
      date: joi.string().isoDate().required(),
      available: joi.boolean().required()
    })
  ).optional(),
  images: joi.array().items(joi.string().uri()).optional()
});

const validateProperty = (data: any) => {
  return propertyValidation.validate(data, { abortEarly: false });
}

export { validateProperty };
