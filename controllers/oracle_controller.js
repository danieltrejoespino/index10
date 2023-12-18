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
 module.exports = {
  test
 }