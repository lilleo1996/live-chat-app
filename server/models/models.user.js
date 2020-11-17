const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  password: String,
  email: String,
},
{
  collection: 'Users',
  timestamp: true,
});

module.exports = mongoose.model('User', userSchema);
