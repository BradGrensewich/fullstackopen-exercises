const logger = require('./logger');

const errorHandler = (error, req, res, next) => {
  logger.error(error);
  if (error.name == 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

module.exports = { errorHandler, unknownEndpoint };
