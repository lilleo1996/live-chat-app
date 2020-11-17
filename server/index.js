require('dotenv/config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());
app.use(cors());
app.use(router);

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    process.stdout.write(`Cannot connect to mongodb: ${err.toString()}`);
    return process.exit(1);
  }
});

io.on('connect', (socket) => {
  socket.on('join', ({ email, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, email, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.email}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.email} has joined!` });

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.email, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.email} has left.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log('Server has started.');
});
