const express = require('express');
const User = require('./models/models.user.js');
const Room = require('./models/models.room.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({ response: 'Server is up and running.' });
});

// SIGN IN
router.post('/user/sign-in', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: 'missing required fields',
    });
  }

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.json({
      success: false,
      message: 'email is not registered',
    });
  }

  return res.json({
    success: true,
    message: 'success sign in',
  });
});

// SIGN UP
router.post('/user/sign-up', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: 'missing required fields',
    });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.json({
      success: false,
      message: 'email was registered',
    });
  }

  const newUser = new User({ email, password });
  await newUser.save();
  return res.json({
    success: true,
    message: 'user is created',
  });
});

// ADD USER TO THE ROOM
router.post('/room/user', async (req, res) => {
  const { room, email: user } = req.body;

  if (!room || !user) {
    return res.json({
      success: false,
      message: 'missing required fields',
    });
  }

  const selectedRoom = await Room.findOne({ room });

  if (!selectedRoom) {
    const newRoom = new Room({ room, users: [user], messages: [] });
    await newRoom.save();
    return res.json({
      success: true,
      message: 'created room and added user',
    });
  }

  if (selectedRoom.users.includes(user)) {
    return res.json({
      success: true,
      message: 'user already exists in the room',
    });
  }

  console.log('udate user', user, room);
  await Room.updateOne({ room }, { $push: { users: user } });

  return res.json({
    success: true,
    message: 'added user',
  });
});

// ADD MESSAGGE TO THE ROOM
router.post('/room/messages', async (req, res) => {
  const { room, message } = req.body;
  if (!room || !message) {
    return res.json({
      success: false,
      message: 'missing required fields',
    });
  }

  const selectedRoom = await Room.findOne({ room });
  if (!selectedRoom) {
    return res.json({
      success: false,
      message: 'room does not exist yet',
    });
  }

  Room.updateOne({ room }, { $push: { messages: message } });
  return res.json({
    success: true,
    message: 'update success',
  });
});

// GET ROOM INFO
router.get('/room/:room', async (req, res) => {
  const { room } = req.params;

  if (!room) {
    return res.json({
      success: false,
      message: 'missing required fields',
    });
  }

  const selectedRoom = await Room.findOne({ room });

  if (!selectedRoom) {
    return res.json({
      success: false,
      message: 'room does not exist yet',
    });
  }

  return res.json({
    success: true,
    message: 'get success',
    data: selectedRoom,
  });
});

module.exports = router;
