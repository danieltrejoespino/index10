const express = require('express')
const router=express.Router()
const {home} = require('../controllers/controller')
router.use(express.json())


// router.get('/', (req, res) => {
// //   res.send('Hello World!')
// res.render('index')
// })

router.get('/', home.main)





module.exports = router