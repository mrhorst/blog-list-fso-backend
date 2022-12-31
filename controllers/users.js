const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    likes: 1,
  })
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  if (password.length < 3) {
    return res.status(400).json({
      error:
        'Invalid input. Password must be at least 3 characters ' +
        'long (but honestly, it should be a lot longer than that!).',
    })
  }

  const saltRounds = 3

  try {
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (e) {
    next(e)
  }
})

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)

  res.status(200).json(user)
})

// usersRouter.delete('/:id', async (req, res) => {
//   const userToDelete = await User.findByIdAndDelete(req.params.id)
//   res.status(200).json(userToDelete)
// })

module.exports = usersRouter
