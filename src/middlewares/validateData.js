const Joi = require('joi');

async function validateBills(req, res, next) {
  const billsSchema = Joi.object({
    groupId: Joi.number().required(),
    amount: Joi.number().min(0).required(),
    description: Joi.string().trim().min(5).max(255)
      .required(),
  });
  try {
    await billsSchema.validateAsync(req.body, { abortEarly: false });
    console.log('req.body: ', req.body);
    next();
  } catch (err) {
    // console.log('err in validateData middleware:', err);
    console.log('errDetails: ', err.details);
    const message = err.details.map((errObj) => ({
      message: errObj.message,
      field: errObj.path[0],
    }));
    console.log('details message: ', message);
    res.status(400).json({ success: false, message });
  }
}

module.exports = validateBills;
