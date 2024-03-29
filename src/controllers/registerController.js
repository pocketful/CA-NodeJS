const { registerUserDb } = require('../models/registerModel');
const { hashPassword } = require('../utils/helpers');

async function registerUser(req, res) {
  const { fullname, email, password } = req.body;
  try {
    const hashedPass = hashPassword(password);
    const insertResult = await registerUserDb(fullname, email, hashedPass);
    if (insertResult.affectedRows === 1) {
      return res.status(201).json({ success: true, message: 'New user successfully created.' });
    }
    return res.status(400).json({ success: false, message: 'Failed to create new user' });
  } catch (err) {
    console.log('error in register controller:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    if (err.errno === 1062) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = registerUser;
