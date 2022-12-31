const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const errorHandler = require('./middlewares/error')
const {
  tokenExtractor,
  userExtractor,
} = require('./middlewares/authentication')

//Routers
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const logger = require('./middlewares/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(tokenExtractor)
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)

logger.info('connecting to', config.MONGODB_URI)
;(() => {
  try {
    mongoose.connect(config.MONGODB_URI)
    logger.info('connected to MongoDB!')
  } catch (e) {
    logger.error('error connecting to MongoDB:', e.message)
  }
})()

module.exports = app
