const { getGroupsDb, postGroupsDb } = require('../models/groupsModel');

async function getGroups(req, res) {
  try {
    const groups = await getGroupsDb();
    return res.json(groups);
  } catch (err) {
    console.log('error in get groups controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function postGroups(req, res) {
  const { name } = req.body;
  try {
    const insertResult = await postGroupsDb(name);
    console.log('insertResult:', insertResult);
    return res.status(201).json({ success: true, message: 'New group successfully created.' });
  } catch (err) {
    console.log('error in post groups controller:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  getGroups,
  postGroups,
};
