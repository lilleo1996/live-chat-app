const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: String,
  users: [
    { type: String },
  ],
  messages: [{ user: String, text: String }],
},
{
  collection: 'Rooms',
  timestamp: true,
});

module.exports = mongoose.model('Room', messageSchema);
