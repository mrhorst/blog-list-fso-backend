const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    const isCorrectPassword =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && isCorrectPassword)) {
      return res.status(401).json({
        error: 'Invalid username or password. Try again.',
      })
    }

    const userToken = {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(
      userToken,
      process.env.JWT_SECRET /*, {
      expiresIn: 60 * 60,
    }*/
    )

    res.status(200).json({ token, username: user.username, name: user.name })
  } catch (e) {
    next(e)
  }
})

module.exports = loginRouter
