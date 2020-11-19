const express = require('express')
const controller = require('../controllers/rooms.controller')

const router= express.Router()

// ADD USER TO THE ROOM
router.post('/user', controller.addUser);

// ADD MESSAGGE TO THE ROOM
router.post('/message', controller.addMessage);

// GET ROOM INFO
router.get('/:room', controller.getRoom);

module.exports = router;