const { getGroupsDb } = require('../models/groupsModel');

async function getGroups(req, res) {
  try {
    const groups = await getGroupsDb();
    return res.json(groups);
  } catch (err) {
    console.log('error in groups controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = getGroups;
