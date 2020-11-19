const User = require('../models/user.model');

module.exports.signIn = async (req, res) => {
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
      message: 'email or password is incorrect',
    });
  }

  return res.json({
    success: true,
    message: 'signed in',
  });
}

module.exports.signUp = async (req, res) => {
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
}