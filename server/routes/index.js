var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../schemas/User');

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    username: user.username,
  },
    process.env.JWT_SECRET);
}

router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    const match = await bcrypt.compare(password, user.passwordHash);

    if (match) {
      res.json({ token: generateToken({ id: user._id, username: user.username }) });
    } else {
      res.json({ error: 'Password does not match' });
    }
    return;
  }

  res.json({ error: 'User does not exist' });
});

router.post('/register', async function (req, res, next) {
  const { username, password, confirmPassword } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    res.json({ error: `User with username ${username} already exists` });
    return;
  }

  if (password !== confirmPassword) {
    res.json({ error: 'Passwords do not match' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  let newUser = await new User({
    username,
    passwordHash
  });
  newUser = await newUser.save();

  res.json({ token: generateToken({ id: newUser._id, username: newUser.username }) });
});

// router.post('/post', () => {
//   res.json({});
// });

// router.get('/posts', () => {
//   res.json({});
// });

module.exports = router;
