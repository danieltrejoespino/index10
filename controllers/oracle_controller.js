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
      u.nombre,
      u.apellido_paterno,
      u.apellido_materno,
      to_char(u.fecha_nac, 'dd/mm/yyyy') fecha_nac,            
      d.nombre_departamento,
      E.ID_EMPRESA EMPRESA,
      r.equipo,          
      to_char(r.fecha, 'dd/mm/yyyy') || ' ' || hora hora,
      u.status_id      
      FROM asistencia.registroextemp r
      left JOIN asistencia.usuarios u
      left join asistencia.departamentos d on d.id = u.departamento_id ON u.id_usuario = r.clave  
      LEFT JOIN EMPRESAS E ON E.ID = U.EMPRESA_ID        
      --WHERE r.fecha   = NVL(to_date(v_fecha, 'dd/mm/yyyy'), trunc(sysdate)) and hora between '00:00:00' and NVL(v_hora || ':00', '23:59:59')    
      --AND upper(to_char(r.clave) || u.nombre || u.apellido_paterno || u.apellido_materno || d.nombre_departamento || to_char(fecha_nac, 'dd/mm/yyyy')) like '%' || upper(v_specify) || '%'
      WHERE ROWNUM   <= 300      
      ORDER BY 8 ASC
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