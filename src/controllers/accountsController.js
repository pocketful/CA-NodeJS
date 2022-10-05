const { getAccountsDb, postAccountsDb } = require('../models/accountsModel');

async function getAccounts(req, res) {
  const { userId } = req;
  try {
    const accounts = await getAccountsDb(userId);
    return res.json(accounts);
  } catch (err) {
    console.log('error in accounts controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function postAccounts(req, res) {
  const { groupId } = req.body;
  const { userId } = req;
  try {
    const insertResult = await postAccountsDb(groupId, userId);
    if (insertResult.affectedRows === 1) {
      return res.status(201).json({ success: true, message: 'New group to your account was added successfully.' });
    }
    return res.status(400).json({ success: false, message: 'Failed to add new group to your account.' });
  } catch (err) {
    console.log('error in post accounts controller:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  getAccounts,
  postAccounts,
};
