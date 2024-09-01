import joi from 'joi';

const userValidation = joi.object ({
    username: joi.string().min(3).max(30).trim().required(),
    firstName: joi.string().max(100).trim().required(),
    lastName: joi.string().max(100).trim().required(),
    phoneNumber: joi.string().allow(null, '').max(15).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    role: joi.string().valid('landlord', 'traveler').required(),
    //dateOfBirth: joi.date().required()
});
  
const userAuthValidation = joi.object ({
  password: joi.string().min(8).required(),
  username: joi.string().min(3).max(30).trim().required()
});

const validateUser = (data: any) => {
  return userValidation.validate(data, { abortEarly: false });

}

const validateUserAuth = (data: any) => {
  return userAuthValidation.validate(data, { abortEarly: false });
}
  
export { validateUser, validateUserAuth };