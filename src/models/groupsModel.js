const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getGroupsDb() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM groups';
    const [groups] = await conn.execute(sql, []);
    return groups;
  } catch (err) {
    console.log('error in groups model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getGroupsDb,
};
