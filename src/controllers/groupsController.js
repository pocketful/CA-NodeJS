const { postGroupsDb, getNotAssignedGroupsDb } = require('../models/groupsModel');

async function getNotAssignedGroups(req, res) {
  const { userId } = req;
  try {
    const groups = await getNotAssignedGroupsDb(userId);
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
    if (insertResult.affectedRows === 1) {
      return res.status(201).json({ success: true, message: 'New group successfully created.' });
    }
    return res.status(400).json({ success: false, message: 'Failed to create new group.' });
  } catch (err) {
    console.log('error in post groups controller:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    if (err.errno === 1062) {
      return res.status(400).json({
        success: false,
        message: 'Group with this name already exists.',
      });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  getNotAssignedGroups,
  postGroups,
};
