const { getAccountsDb } = require('../models/accountsModel');

async function getAccounts(req, res) {
  try {
    const accounts = await getAccountsDb();
    return res.json(accounts);
  } catch (err) {
    console.log('error in accounts controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = getAccounts;
