const express = require('express')
const router=express.Router()
const {home,get_data} = require('../controllers/controller')
const {test,index10} = require('../controllers/oracle_controller')
const {crud_extensions} = require('../controllers/mongo_controller')
router.use(express.json())
 

router.get('/', home.main)
router.get('/home', home.main)
// router.get('/index10', home.index10)
router.get('/index11', home.index11)
router.get('/extensiones', home.extensiones)
router.get('/extensiones_v2', home.extensiones_v2)
router.get('/chat', home.chat)
router.get('/encriptar', home.encriptar)
router.get('/uploads', home.uploads)
router.get('/games', home.games)
router.get('/caja_ahorro', home.caja_ahorro)
router.get('/libera_nomina', home.libera_nomina)
router.get('/buzonAmor', home.buzonAmor)
router.get('/retiroAhorro', home.retiroAhorro)

// ORACLE
router.get('/test', test.test)
router.get('/index_data', index10.index10)
router.get('/caja_ahorro_data', index10.caja_ahorro_data)
router.post('/libera_nomina_data', index10.libera_nomina)
router.get('/buzonAmorData', index10.buzonAmor)
router.get('/retiroAhorroData', index10.retiroAhorro)

// mongo
router.get('/get_extensions', crud_extensions.get_extensions)


router.get('/data_extensiones', get_data.extensiones)




module.exports = router





























