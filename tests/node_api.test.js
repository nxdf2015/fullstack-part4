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
describe('test when there is some blogs saved ',() => {

  test('blog list application returns the correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs').expect(200)

    expect(response.body.length).toBe(data.length)
  })

  test('application return in the json format', async () => {
    await api.get('/api/blogs').expect(200).expect('content-type', /json/)
  })
})


describe(' test validation model and properties missing',() => {
  test('creating new blogs  with the title and url \
  properties are missing from the request data, the backend responds  with the status code 400 Bad Request', async () => {
    await api
      .post('/api/blogs')
      .set('Content-Type','application/json')
      .send({ url: 'https://reactpatterns.com/', likes: 7 })
      .expect(400)


  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })

})


describe(' add or update a blog  a new blog',() => {


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

  test('update number like of an existing  post', async() => {
    const id = data[0]._id
    const updateLike = 10

    const result = await api.patch(`/api/blogs/${id}/${updateLike}`)

    expect(result.body.id).toEqual(id)
    expect(result.body.likes).toEqual(updateLike)
  })

  test('update a negative number like of an existing  post, must return status 400', async() => {
    const id = data[0]._id
    const updateLike = -10

    await api.patch(`/api/blogs/${id}/${updateLike}`).expect(400)


  })


})

describe('delete a blog', () => {
  test('delete an existing blog', async () => {
    const id = data[0]._id
    const uri=`/api/blogs/${id}`
    await api.delete(uri)
      .expect(200)

    await  api.get(uri).expect(400)
  })

  test('try to delete a blog with an invalid id', async () => {
    const id = 1
    const uri=`/api/blogs/${id}`
    await api.delete(uri)
      .expect(400)


  })
})

afterAll(() =>   {
  mongoose.connection.close()
})
