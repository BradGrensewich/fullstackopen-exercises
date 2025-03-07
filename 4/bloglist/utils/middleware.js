const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);
  req.user = user;
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error);
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return res.status(400).json({ error: 'expected `username` to be unique' });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }
  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
