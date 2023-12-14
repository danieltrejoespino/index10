const express = require('express')
const app = express()
const path = require('path');  
const port = 3000

const routers = require(path.join(__dirname,'routes', 'routes'));
app.use('/',routers)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/static/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

app.use('/static', express.static(path.join(__dirname, 'node_modules/')));

// app.use((req, res, next) => {
//     res.status(404).render('404');
//   });


app.listen(port, () => {
    console.log(__dirname);
  console.log(`Example app listening on port ${port}`)
})