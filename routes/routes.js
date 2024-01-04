const express = require('express')
const router=express.Router()
const {home,get_data} = require('../controllers/controller')
const {test,index10} = require('../controllers/oracle_controller')
const {test_conn} = require('../controllers/mongo_controller')
router.use(express.json())


// router.get('/', (req, res) => {
// //   res.send('Hello World!')
// res.render('index')
// })

router.get('/', home.main)
router.get('/home', home.main)
// router.get('/index10', home.index10)
router.get('/index11', home.index11)
router.get('/extensiones', home.extensiones)
router.get('/chat', home.chat)
router.get('/encriptar', home.encriptar)
router.get('/uploads', home.uploads)
router.get('/games', home.games)

// ORACLE
router.get('/test', test.test)
router.get('/index_data', index10.index10)

// mongo
router.get('/test_mongo_conn', test_conn.test_conn)


router.get('/data_extensiones', get_data.extensiones)


module.exports = router