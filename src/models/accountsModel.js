const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getAccountsDb(userId) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT groups.id, groups.name FROM accounts LEFT JOIN groups ON accounts.group_id = groups.id WHERE accounts.user_id = ?';
    const [accounts] = await conn.execute(sql, [userId]);
    return accounts;
  } catch (err) {
    console.log('error in accounts model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

async function postAccountsDb(groupId, userId) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO accounts (group_id, user_id) VALUES (?, ?)';
    const [insertResult] = await conn.execute(sql, [groupId, userId]);
    return insertResult;
  } catch (err) {
    console.log('error in post accounts model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getAccountsDb,
  postAccountsDb,
};
