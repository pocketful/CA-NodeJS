const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getBillsByGroupIdDb(groupId) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM bills WHERE group_id = ?';
    const [bills] = await conn.execute(sql, [groupId]);
    return bills;
  } catch (err) {
    console.log('error in get bills model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

async function postBillsDb(groupId, amount, description) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO bills (group_id, amount, description) VALUES (?, ?, ?)';
    const [insertResult] = await conn.execute(sql, [groupId, amount, description]);
    return insertResult;
  } catch (err) {
    console.log('error in post bills model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getBillsByGroupIdDb,
  postBillsDb,
};
