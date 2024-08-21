import joi from 'joi';

const paymentValidation = joi.object ({
    userId: joi.number().integer().positive().required(),
    stripe_payment_intent_id: joi.string().optional(),
    stripe_customer_id: joi.string().optional(),
    amount: joi.number().positive().required(),
    paymentDate: joi.date().optional(),
    paymentMethod: joi.string().required(),
    status: joi.string().valid('pending', 'completed', 'failed').required()
});

const validatePayment = (data: any) => {
  return paymentValidation.validate(data, { abortEarly: false });
}

  
export { validatePayment };