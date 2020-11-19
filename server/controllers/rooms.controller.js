const Room = require('../models/room.model');

module.exports.addUser = async (req, res) => {
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

  await Room.updateOne({ room }, { $push: { users: user } });

  return res.json({
    success: true,
    message: 'added user',
  });
}

module.exports.addMessage = async (req, res) => {
  const { room, email: user, text } = req.body;

  if (!room || !user || !text) {
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

  await Room.updateOne({ room }, { $push: { messages: {user, text} } });

  return res.json({
    success: true,
    message: 'added message',
  });
}

module.exports.getRoom = async (req, res) => {
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
}