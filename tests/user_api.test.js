const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')

// const api = supertest(app)

// beforeEach(() => {})

test('when creating a user...username must have at least 3 characters', async () => {
  const user = {
    username: 'tt',
    name: 'Not gonna work',
    password: 'password',
  }

  await api.post('/api/users').send(user).expect(400)
})

test('when creating a user...password must have at least 3 characters', async () => {
  const user = {
    username: 'ttt',
    name: 'Not gonna work',
    password: 'pw',
  }

  await api.post('/api/users').send(user).expect(400)
})

test('when creating a user...if username and password have at least 3 chars, create the user', async () => {
  const user = {
    username: 'more than 3',
    name: 'some name',
    password: 'password',
  }

  await api.post('/api/users').send(user).expect(201)
})

afterAll(() => {
  mongoose.connection.close()
})
