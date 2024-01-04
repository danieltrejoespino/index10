const db_config = require('../config/mongo_config')
const mongoose = require('mongoose');


const test_conn = {
    test_conn : (req,res) => {
        mongoose.connect(db_config.databaseUrl,)        
        .then((result) => {
            console.log('conectado');
            res.json('conectado')
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = {
    test_conn
}