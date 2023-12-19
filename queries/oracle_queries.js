// queries.js
const db = require('../config/oracle_config');

async function executeQuery(sql) {
  let connection;

  try {
    const pool = db.getPool();
    connection = await pool.getConnection();
    const result = await connection.execute(sql);
    return result.rows;
  } catch (error) {
    throw new Error('Error executing query: ' + error.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error al cerrar la conexión:', error);
      }
    }
  }
}

module.exports = {
  executeQuery
};
