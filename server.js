const express = require('express');
const socketio = require('socket.io');

const connections = [];
const title = 'Untitled Presentation';
const app = express();
const server = app.listen(3000);
const io = socketio.listen(server);

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

io.sockets.on('connection', (socket) => {
  socket.once('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('Disconnected: %s sockets remaining', connections.length);
  });

  socket.emit('welcome', { title });

  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
});

console.log('Server is running at http://localhost:3000');
