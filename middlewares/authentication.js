const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization') // Gets the authorization HEADER...
  try {
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const token = authorization.substring(7) //strips the "Bearer " from the authorization header
      req.token = token
    }
  } catch (e) {
    next(e)
  }
  next()
}

const userExtractor = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET)
    const user = await User.findById(decodedToken.id)

    req.user = user
  } catch (e) {
    next(e)
  }
  next()
}

module.exports = { tokenExtractor, userExtractor }
