const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    return res.status(401).json({ error: 'invalid username or password' });
  }

  const token = jwt.sign(
    { username: user.username, id: user.id },
    process.env.SECRET,
  );

  res.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
