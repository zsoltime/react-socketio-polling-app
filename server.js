const express = require('express');
const path = require('path');
const socketio = require('socket.io');

let audience = [];
let speaker = {};
let title = 'Untitled Presentation';
const connections = [];
const app = express();
const server = app.listen(3000);
const io = socketio.listen(server);

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

io.sockets.on('connection', (socket) => {
  socket.once('disconnect', function() {
    connections.splice(connections.indexOf(socket), 1);
    const newAudience = audience.filter(member => this.id !== member.id);

    if (newAudience.length !== audience.length) {
      audience = newAudience;
      io.sockets.emit('audience', { audience: newAudience });
      console.log('Someone has just left, %d members are remaining', audience.length);
    } else if (this.id === speaker.id) {
      console.log('%s has left. %s is over', speaker.name, title);
      speaker = {};
      title = 'Untitled Presentation';
      io.sockets.emit('end', {
        title,
        speaker: '',
      });
    }

    socket.disconnect();
    console.log('Disconnected: %s sockets remaining', connections.length);
  });

  socket.on('join', function(payload) {
    const newMember = {
      id: this.id,
      name: payload.name,
      type: 'member',
    };
    // emits joined to one socket
    this.emit('joined', newMember);
    audience.push(newMember);
    // broadcasts to every connected sockets
    io.sockets.emit('audience', { audience });
  });

  socket.on('start', function(payload) {
    speaker = {
      id: this.id,
      name: payload.name,
      type: 'speaker',
    };
    title = payload.title;
    this.emit('joined', speaker);
    io.sockets.emit('start', {
      title,
      speaker: speaker.name,
    });
    console.log('Presentation started: %s by %s', title, speaker.name);
  });

  socket.emit('welcome', {
    audience,
    speaker: speaker.name,
    title,
  });

  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
});

console.log('Server is running at http://localhost:3000');
