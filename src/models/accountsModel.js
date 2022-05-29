const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getAccountsDb() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM accounts';
    const [accounts] = await conn.execute(sql, []);
    return accounts;
  } catch (err) {
    console.log('error in accounts model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getAccountsDb,
};
