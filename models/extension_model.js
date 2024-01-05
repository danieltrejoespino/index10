

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const extensionSchema = new Schema({
    ext : String,
    usuario : String,
    departamento : String
})

const extension = mongoose.model('extensiones',extensionSchema)

module.exports={
    extension
}