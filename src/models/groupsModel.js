const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getNotAssignedGroupsDb(userId) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM groups WHERE id NOT IN (SELECT groups.id FROM groups LEFT JOIN accounts ON groups.id = accounts.group_id WHERE accounts.user_id = ?)';
    const [groups] = await conn.execute(sql, [userId]);
    return groups;
  } catch (err) {
    console.log('error in get groups model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

async function postGroupsDb(name) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO groups (name) VALUES (?)';
    const [insertResult] = await conn.execute(sql, [name]);
    return insertResult;
  } catch (err) {
    console.log('error in post groups model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getNotAssignedGroupsDb,
  postGroupsDb,
};
