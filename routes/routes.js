const express = require('express')
const router=express.Router()
const {home,get_data} = require('../controllers/controller')
router.use(express.json())


// router.get('/', (req, res) => {
// //   res.send('Hello World!')
// res.render('index')
// })

router.get('/', home.main)
router.get('/home', home.main)
router.get('/index10', home.index10)
router.get('/extensiones', home.extensiones)
router.get('/chat', home.chat)
router.get('/encriptar', home.encriptar)



router.get('/data_extensiones', get_data.extensiones)


module.exports = router