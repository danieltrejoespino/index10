// const db_config = require('../config/mongo_config')
const mongoose = require('mongoose');
const  {extension} = require('../models/extension_model')

const crud_extensions = {
    get_extensions : async (req,res) => {
       try {
        const arrayExt = await extension.find()        
        console.log(arrayExt);
        res.json(arrayExt)
       } catch (error) {
        console.log(error);
        res.json(error)
       } 
    }
}

module.exports = {
    crud_extensions
}