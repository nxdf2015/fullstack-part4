const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const data = require('./data')

const api = request(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const listBlogs = data.map((d) => new Blog(d))
  const promiseArray = listBlogs.map((blog) => blog.save())
  Promise.all(promiseArray)

})

test('blog list application returns the correct amount of blog posts', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)

  expect(response.body.length).toBe(data.length)
})

test('application return in the json format', async  () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('content-type',/json/)


})

afterAll(() => {
  mongoose.connection.close()
})
