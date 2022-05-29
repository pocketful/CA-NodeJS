const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getBillsDb() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM bills';
    const [bills] = await conn.execute(sql, []);
    return bills;
  } catch (err) {
    console.log('error in bills model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getBillsDb,
};
