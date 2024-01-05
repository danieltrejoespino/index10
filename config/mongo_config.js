const mongoose = require('mongoose');

const user = 'subirarchivosdrive01'
const pass = 'Danieltrejo1'
const dbname = 'extensiones'
const databaseUrl = `mongodb+srv://${user}:${pass}@cluster0.hn9zd6c.mongodb.net/${dbname}?retryWrites=true&w=majority`




const conectarBaseDeDatos = async () => {
    try {
        await mongoose.connect(databaseUrl);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

module.exports = conectarBaseDeDatos;
