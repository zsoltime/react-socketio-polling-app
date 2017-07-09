const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const audience = [];
const connections = [];
const title = 'Untitled Presentation';
const app = express();
const server = app.listen(3000);
const io = socketio.listen(server);

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

io.sockets.on('connection', (socket) => {
  socket.once('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('Disconnected: %s sockets remaining', connections.length);
  });

  socket.on('join', function(payload) {
    const newMember = {
      id: this.id,
      name: payload.name,
    };
    // emits joined to one socket
    this.emit('joined', newMember);
    audience.push(newMember);
    // broadcasts to every connected sockets
    io.sockets.emit('audience', audience);
  });

  socket.emit('welcome', { title });

  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
});

console.log('Server is running at http://localhost:3000');
