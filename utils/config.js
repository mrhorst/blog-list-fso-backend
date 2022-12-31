require('dotenv').config()

const MONGODB_URI =
  process.env.NODE_ENV === 'development'
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI_PROD

const PORT = process.env.PORT

module.exports = {
  MONGODB_URI,
  PORT,
}
