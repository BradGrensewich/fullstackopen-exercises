const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const requestLogger = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const testingRouter = require('./controllers/testing');
const middleware = require('./utils/middleware');

mongoose.set('strictQuery', false);
logger.info(`connecting to ${config.MONGODB_URI}`);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('successfully connected to db');
  })
  .catch((error) => {
    logger.error('error connecting to db: ', error);
  });

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(requestLogger('tiny'));
}
app.use(middleware.tokenExtractor);

app.use('/api/blogs', middleware.userExtractor, blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}
app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
