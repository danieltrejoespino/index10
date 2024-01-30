// db.js
const oracledb = require('oracledb');

const dbConfig = {
  // user: 'asistencia',
  // password: 'ceac4d0e777',
  user: 'dbo',
  password: 'prueba',
  connectString: '(DESCRIPTION =(LOAD_BALANCE = ON)(ADDRESS_LIST =(ADDRESS =(PROTOCOL = TCP)(HOST = 192.168.1.13)(PORT = 1521))(ADDRESS =(PROTOCOL = TCP)(HOST = 192.168.1.14)(PORT = 1521)))(CONNECT_DATA =(SERVICE_NAME = xccmtaf)))',
  poolMax: 4, 
  poolMin: 2, 
  poolIncrement: 1, 
  poolTimeout: 60
};

let pool;

async function initPool() {
  pool = await oracledb.createPool(dbConfig);
}

async function closePool() {
  if (pool) {
    await pool.close();
  }
}

function getPool() {
  if (!pool) {
    throw new Error('El pool de conexiones no está inicializado. Llama a initPool() primero.');
  }
  return pool;
}

module.exports = {
  initPool,
  closePool,
  getPool
};
