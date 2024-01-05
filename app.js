const express = require('express')
const path = require('path');  
// socket io
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const conectarBaseDeDatos  = require('./config/mongo_config')

const app = express()
const PORT=process.env.PORT || 3000;

const server = createServer(app);
const io = new Server(server);




const routers = require(path.join(__dirname,'routes', 'routes'));
app.use('/',routers)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static(path.join(__dirname, 'node_modules/')));


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('chat message', (msg) => {    
    console.log(msg);
    io.emit('chat message', msg);

  });
});


conectarBaseDeDatos()

server.listen(PORT, () => {
    // console.log(__dirname);
  console.log(`Example app listening on port ${PORT}`)
})

