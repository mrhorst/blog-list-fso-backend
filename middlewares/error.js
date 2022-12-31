const logger = require('./logger')

const errorHandler = async (error, req, res, next) => {
  // logger.error(Object.keys(error))
  // logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token: Missing or invalid.' })
  } else if (error.name === 'TokenExpiredError') {
    return res
      .status(401)
      .json({ error: 'Token expired. Please authenticate.' })
  }

  next(error)
}

module.exports = errorHandler
