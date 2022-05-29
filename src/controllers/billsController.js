const { getBillsDb, postBillsDb, getBillsByGroupIdDb } = require('../models/billsModel');

async function getBills(req, res) {
  try {
    const bills = await getBillsDb();
    return res.json(bills);
  } catch (err) {
    console.log('error in get bills controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function getBillsByGroupId(req, res) {
  const { groupId } = req.params;
  try {
    const bills = await getBillsByGroupIdDb(groupId);
    return res.json(bills);
  } catch (err) {
    console.log('error in get bills by id controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function postBills(req, res) {
  const { groupId, amount, description } = req.body;
  try {
    const insertResult = await postBillsDb(groupId, amount, description);
    console.log('insertResult:', insertResult);
    if (insertResult.affectedRows === 1) {
      return res.status(201).json({ success: true, message: 'New bill successfully created.' });
    }
    return res.status(400).json({ success: false, message: 'Failed to create new bill.' });
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
  getBillsByGroupId,
  postBills,
};
