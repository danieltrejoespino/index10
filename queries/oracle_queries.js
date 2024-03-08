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


async function ejecutarProcedimiento(nomina, campana) {
  let connection;

  try {
    const pool = db.getPool();
    connection = await pool.getConnection();

    // Aquí ejecutas tu procedimiento con los parámetros necesarios
    const result = await connection.execute(
      `BEGIN
      XSP_LIBERA_NOMINA_PRUEBA(:v_nomina, :v_schema, :rc);
       END;`,
       {
        v_nomina: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: 577242 },
        v_schema: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: 'hsbc' },
        rc: cursor
      }
    );

    // Puedes procesar el resultado si es necesario
    // const output = result.outBinds;

    // Puedes retornar el resultado o cualquier otra cosa según tus necesidades
    return "Procedimiento ejecutado correctamente";
  } catch (error) {
    throw new Error('Error ejecutando procedimiento: ' + error.message);
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
  executeQuery,
  ejecutarProcedimiento
};