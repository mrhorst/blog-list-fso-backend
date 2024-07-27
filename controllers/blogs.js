// const dotenv = require('dotenv')
// const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// const helper = require('../utils/helper')
// const logger = require('../middlewares/logger')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const allBlogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })

    const blogsByAuthUser = allBlogs.filter(blog => {
      return blog.user.id == request.user.id
    })

    const allBlogsExceptAuthUser = allBlogs.filter(blog => {
      return blog.user.id !== request.user.id
    })

    const b = {blogsByAuthUser, allBlogsExceptAuthUser}

    response.json(b)
  } catch (e) {
    next(e)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blogKeys = Object.keys(request.body)

  if (!blogKeys.includes('title')) {
    return response
      .status(400)
      .json({ message: 'Bad Request: Mandatory field is missing.' })
  }

  if (!request.body.title) {
    return response.status(400).json({ message: 'Title cannot be empty.' })
  }

  try {
    const blog = new Blog(request.body)
    if (!blogKeys.includes('likes')) blog.likes = 0

    const user = await User.findById(request.user.id)

    blog.user = user.id

    console.log(blog)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (e) {
    next(e)
  }
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    response.status(200).json(blog)
  } catch (e) {
    response.status(404).json({ message: 'resource not found' })
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === request.user.id) {
      try {
        await Blog.findByIdAndDelete(request.params.id)
        return response
          .status(200)
          .json({ message: `${request.params.id} deleted successfully!` })
      } catch (e) {
        next(e)
      }
    } else {
      return response.status(401).json({ message: 'You are not the owner.' })
    }
  } catch (e) {
    next(e)
  }
})

blogsRouter.post('/:id/likes', async (request, response, next) => {
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { $inc: { likes: 1 }, $addToSet: { likedByUser: request.user}},
      { new: true }
    )
    
    await User.findByIdAndUpdate(
      request.user,
      { $addToSet: { likedBlogs: request.params.id}},
      { new: true} 
    )

    response.status(201).json(updatedBlog)
  } catch(e){
    next(e)
  }
  next()
})

module.exports = blogsRouter
