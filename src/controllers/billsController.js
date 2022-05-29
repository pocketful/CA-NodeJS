const { getBillsDb, postBillsDb } = require('../models/billsModel');

async function getBills(req, res) {
  try {
    const bills = await getBillsDb();
    return res.json(bills);
  } catch (err) {
    console.log('error in get bills controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function postBills(req, res) {
  const { groupId, amount, description } = req.body;
  try {
    const insertResult = await postBillsDb(groupId, amount, description);
    console.log('insertResult:', insertResult);
    return res.status(201).json({ success: true, message: 'New bill successfully created.' });
  } catch (err) {
    console.log('error in post bills controller:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  getBills,
  postBills,
};
