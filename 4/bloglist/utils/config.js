require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.NODE_ENV === 'test'
    ? process.env.MONGODB_TEST_URI
    : process.env.MONGODB_URI;

module.exports = { PORT, MONGODB_URI };
