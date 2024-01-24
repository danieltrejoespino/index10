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
      u.id ID,    
      r.clave,
      u.nombre||' '||u.apellido_paterno||' '||u.apellido_materno AS NOMBRE,
      --to_char(u.fecha_nac, 'dd/mm/yyyy') fecha_nac,            
      CASE
			WHEN u.FECHA_NAC IS NULL THEN 'NA'
			ELSE
				(
					TO_CHAR(TRUNC(MONTHS_BETWEEN(SYSDATE, u.FECHA_NAC) / 12)) || ' años ' ||
					TO_CHAR(TRUNC(MOD(MONTHS_BETWEEN(SYSDATE, u.FECHA_NAC), 12))) || ' meses ' ||
					TO_CHAR(FLOOR(SYSDATE - ADD_MONTHS(u.FECHA_NAC, TRUNC(MONTHS_BETWEEN(SYSDATE, u.FECHA_NAC))))) || ' días'
				) 
		  END AS EDAD,
      d.nombre_departamento AS DEPARTAMENTO,
      E.ID_EMPRESA CENTRO ,
      r.equipo IP,          
      TO_CHAR(R.FECHA, 'DD/MM/YYYY')||' ' ||R.HORA AS FECHA,
      u.status_id      
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

  },
  caja_ahorro_data : async (req,res) => {
    try {
      await db.initPool();      
      const sql = `
      WITH c1 AS (--Lo que se tiene ahorrado hasta el ultimo corte
        SELECT
        usuario_id,
        cantidad
        FROM
        asistencia.caja_ahorros
        WHERE
        concepto LIKE '%Ahorro al 2do corte 2023%'
        ), fechas_actuales AS (
        SELECT
        MAX(fecha2)            AS fecha,
        substr(concepto, 1, 8) AS concepto
        FROM
        asistencia.caja_ahorros
        WHERE
        ( concepto LIKE '%Ahorro Q%'
        OR concepto LIKE '%Ahorro S%' )
        GROUP BY
        substr(concepto, 1, 8)
        ), c2 AS (--Ahorro por semana o quincena
        SELECT
        r.usuario_id,
        r.cantidad,
        ROW_NUMBER()
        OVER(PARTITION BY usuario_id
        ORDER BY
        fecha2 DESC
        ) AS rn
        FROM
        asistencia.caja_ahorros r
        JOIN fechas_actuales fa ON fa.concepto = substr(r.concepto, 1, 8)
        AND fa.fecha = r.fecha2
        WHERE
        r.concepto LIKE '%Ahorro Q%'
        OR r.concepto LIKE '%Ahorro S%'
        ), c3 AS (--Ahorro total actual
        SELECT
        usuario_id,
        SUM(cantidad) AS cantidad
        FROM
        asistencia.caja_ahorros c3
        GROUP BY
        usuario_id
        )
        SELECT
        ROW_NUMBER()
        OVER(
        ORDER BY
        c3.cantidad DESC
        )                     AS ROW_NUM,
        c3.USUARIO_ID,
        u.nombre
        || ' '
        || u.apellido_paterno
        || ' '
        || u.apellido_materno AS NOMBRE,
        c1.cantidad           AS "HASTA_CORTE",
        nvl(c2.cantidad, 0)   AS "AHORRO_S_Q",
        c3.cantidad           "AHORRO_TOTAL"
        FROM
        c3
        LEFT JOIN c2 ON c2.usuario_id = c3.usuario_id
        AND c2.rn = 1
        LEFT JOIN c1 ON c3.usuario_id = c1.usuario_id
        JOIN asistencia.usuarios u ON u.id_usuario = c3.usuario_id
        WHERE u.status_id = 1                     
        GROUP BY
        c3.usuario_id,
        u.nombre
        || ' '
        || u.apellido_paterno
        || ' '
        || u.apellido_materno,
        c1.cantidad,
        c2.cantidad,
        c3.cantidad
        ORDER BY
        6 DESC
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