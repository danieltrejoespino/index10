const express = require('express')
const path = require('path');  
// socket io
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express()
const port = 3000
const server = createServer(app);
const io = new Server(server);




const routers = require(path.join(__dirname,'routes', 'routes'));
app.use('/',routers)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/socket_', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));

app.use('/static', express.static(path.join(__dirname, 'node_modules/')));



io.on('connection', (socket) => {
  console.log('a user connected');
});


app.listen(port, () => {
    // console.log(__dirname);
  console.log(`Example app listening on port ${port}`)
})