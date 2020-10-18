const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../app')
const { deleteOne } = require('../models/blog')
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
  const response = await api.get('/api/blogs').expect(200)

  expect(response.body.length).toBe(data.length)
})

test('application return in the json format', async () => {
  await api.get('/api/blogs').expect(200).expect('content-type', /json/)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  expect(blog.id).toBeDefined()
})

test('making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async (done) => {
  const post = {
    title: 'new blog for the test',
    author: 'author test',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }
  try {
    await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send(post)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(data.length + 1)
    done()
  } catch (error) {
    done(error)
  }
})

test('Write a test that verifies that if the likes property is missing from the request, it will default to the value 0', async (done) => {
  const post = {
    title: 'new blog for the test',
    author: 'author test',
    url: 'https://reactpatterns.com/',
  }
  try {
    let response = await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send(post)

    response = await api.get(`/api/blogs/${response.body.id}`)

    expect(response.body.likes).toEqual(0)
    done()
  } catch (error) {
    done(error)
  }
})

test('update a blog with a put request', async () => {
  const post = {
    title: 'new blog for the test',
    author: 'author test',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  let response = await api
    .post('/api/blogs')
    .set('Content-Type', 'application/json')
    .send(post)

  response = await api.put(`/api/blogs/${response.body.id}`).send({
    title: 'new blog for the test',
    author: 'author updated',
    url: 'https://reactpatterns.com/',
    likes: 7,
  })

  expect(response.body.author).toEqual('author updated')
})

test('creating new blogs  with the title and url \
properties are missing from the request data, the backend responds  with the status code 400 Bad Request', async () => {
  await api
    .post('/api/blogs')
    .set('Content-Type','application/json')
    .send({ url: 'https://reactpatterns.com/', likes: 7 })
    .expect(400)


})

afterAll(() =>   {
  mongoose.connection.close()
})
