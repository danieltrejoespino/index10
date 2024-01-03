const db = require('../config/oracle_config');
const queries = require('../queries/oracle_queries');


const test = {
  test : async (req,res) => {
    try {
      await db.initPool();      
      const sql = 'SELECT * FROM asistencia.ENTRADAS WHERE USUARIO_ID = 84419';
      const result = await queries.executeQuery(sql);
      console.log(result);
      res.json(result)
    } catch (error) {
      console.error('Error:', error);
      res.json(error)
    } finally {
      await db.closePool();
    }

  }
} 

const index10  = {
  index10 : async (req,res) => {
    try {
      await db.initPool();      
      const sql = `
      SELECT      
      r.clave,
      u.NOMBRE || ' ' || u.APELLIDO_PATERNO || ' ' || u.APELLIDO_MATERNO  AS NOMBRE,
      to_char(u.fecha_nac, 'dd/mm/yyyy') AS FECHA_NAC,
      d.nombre_departamento            

    
      FROM asistencia.registroextemp r
      left JOIN asistencia.usuarios u
      left join asistencia.departamentos d on d.id = u.departamento_id ON u.id_usuario = r.clave  
      LEFT JOIN asistencia.EMPRESAS E ON E.ID = U.EMPRESA_ID        
      WHERE TRUNC(r.FECHA) = TRUNC(SYSDATE)      
      ORDER BY HORA DESC
      `;
      const result = await queries.executeQuery(sql);
      console.log(result);
      res.json(result)
    } catch (error) {
      console.error('Error:', error);
      res.json(error)
    } finally {
      await db.closePool();
    }

  }
}


 module.exports = {
  test,
  index10
 }