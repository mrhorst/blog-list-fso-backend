const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

/* Before all tests, clear all entries from the database and
    insert the initalUsers helper list. */

beforeAll(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

test('there are 4 blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(4)
  // .expect('', /application\/json/)
}, 100000)

test('a blog can be added', async () => {
  const newBlog = {
    author: 'newly added author',
    title: 'NEWLY ADDED',
    likes: '2',
  }

  const user = { username: 'test', password: 'test' }
  let userResponse = await api.post('/api/login').send(user)
  let blogsResponse = await api.get('/api/blogs')

  numberOfBlogsBefore = blogsResponse.body.length

  console.log(result.body)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${result.body.token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  response = await api.get('/api/blogs')
  numberOfBlogsAfter = response.body.length

  expect(numberOfBlogsAfter).toEqual(numberOfBlogsBefore + 1)
})

test('the unique identifier of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  response.body.map((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('if likes are missing, default it to zero', async () => {
  const blog = {
    author: 'Tam Tsroh',
    title: 'The art of NGAF',
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const lastBlogAdded = response.body.length - 1
  const newBlog = response.body[lastBlogAdded]

  expect(newBlog.likes).toBe(0)
})

test('returns 400 if title or url are missing from request', async () => {
  const blog = {}

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('a blog can be deleted', async () => {
  const blog = { author: 'Author to be deleted', title: 'Soon to be gone' }

  await api.post('/api/blogs').send(blog).expect(201)

  const blogToBeDeleted = await Blog.findOne({
    author: 'Author to be deleted',
  })

  await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(204)
}, 10000)

test('the number of likes can be updated', async () => {
  const blogs = await Blog.find({})

  const blog = blogs[0]
  console.log(blog)

  await api.put(`/api/blogs/${blog.id}`).send({ likes: blog.likes }).expect(201)

  const updatedBlog = await Blog.findById(blog.id)

  expect(updatedBlog.likes).toBe(blog.likes + 1)
}, 10000)

afterAll(() => {
  mongoose.connection.close()
})
