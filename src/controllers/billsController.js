const { getBillsDb } = require('../models/billsModel');

async function getBills(req, res) {
  try {
    const bills = await getBillsDb();
    return res.json(bills);
  } catch (err) {
    console.log('error in bills controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = getBills;
