const Joi = require('joi');

async function validateUser(req, res, next) {
  const userSchema = Joi.object({
    fullname: Joi.string()
      .trim()
      // pattern: a string of alphabetic characters separated by whitespace, case-insensitive
      .pattern(/^[A-Z]+ [A-Z]+$/i)
      .min(5)
      .max(255),
    email: Joi.string().email().trim().min(5)
      .max(255)
      .lowercase()
      .required(),
    password: Joi.string().min(6).max(255).required(),
    passwordConfirm: Joi.any().valid(Joi.ref('password')),
  });
  try {
    await userSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    // console.log('err in validateUser middleware:', err);
    // console.log('errDetails: ', err.details);
    const message = err.details.map((errObj) => ({
      message: errObj.message,
      field: errObj.path[0],
    }));
    console.log('details message: ', message);
    res.status(400).json({ success: false, message });
  }
}

async function validateBill(req, res, next) {
  const billsSchema = Joi.object({
    groupId: Joi.number().required(),
    amount: Joi.number().min(0).required(),
    description: Joi.string().trim().min(5).max(255)
      .required(),
  });
  try {
    await billsSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const message = err.details.map((errObj) => ({
      message: errObj.message,
      field: errObj.path[0],
    }));
    console.log('details message: ', message);
    res.status(400).json({ success: false, message });
  }
}

async function validateGroup(req, res, next) {
  const groupsSchema = Joi.object({
    name: Joi.string().trim().min(5).max(255)
      .required(),
  });
  try {
    await groupsSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const message = err.details.map((errObj) => ({
      message: errObj.message,
      field: errObj.path[0],
    }));
    console.log('details message: ', message);
    res.status(400).json({ success: false, message });
  }
}

module.exports = {
  validateUser,
  validateBill,
  validateGroup,
};
