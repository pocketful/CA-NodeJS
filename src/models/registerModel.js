const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function registerUserDb(fullname, email, password) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
    const [insertResult] = await conn.execute(sql, [fullname, email, password]);
    return insertResult;
  } catch (err) {
    console.log('error in register model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  registerUserDb,
};
