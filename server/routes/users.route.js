const express = require('express')
const controller = require('../controllers/users.controller')

const router= express.Router()

// SIGN IN
router.post('/sign-in', controller.signIn);

// SIGN UP
router.post('/sign-up',controller.signUp);

module.exports = router;