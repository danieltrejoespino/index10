const user = 'subirarchivosdrive01'
const pass = 'Danieltrejo1'
const dbname = 'extensiones'
const databaseUrl = `mongodb+srv://${user}:${pass}@cluster0.hn9zd6c.mongodb.net/${dbname}?retryWrites=true&w=majority`

module.exports = {
    databaseUrl, 
}