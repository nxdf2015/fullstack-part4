const mongoose = require('mongoose')
const supertest = require('supertest')


const app = require('../app')
const api = supertest(app)

const User = require('../models/user')


describe('create   user',() => {

  beforeEach(async () => {
    await  User.deleteMany({})

  })
  test('create a valid user with username and password return the user created', async () => {
    const data = { 'username':'hellas','name':'arto hellas', 'password' : 'secret' }

    const result =  await api.post('/api/users')
      .set('Content-Type','application/json')
      .send(data)
      .expect(200)


    expect(result.body.password).toBeDefined()


  })


  test('try to create a user without username must repond with status 400 and validation error' , async () => {
    const data = { 'name':'arto hellas', 'password' : 'secret' }
    let usersBefore = await api.get('/api/users')

    const  result =  await api.post('/api/users')
      .set('Content-Type','application/json')
      .send(data)
      .expect(400)


    expect(result.text).toBe('ValidationError')

    let usersAfter = await api.get('/api/users')
    expect(usersAfter.length) === usersBefore.length

  })

  test('try to create a user with password with lenght less than 3  must repond with status 400 and validation error' , async () => {
    const data = { 'username':'hellas', 'name':'arto hellas', 'password' : 's' }

    const result =  await api.post('/api/users')
      .set('Content-Type','application/json')
      .send(data)
      .expect(400)


    expect(result.text).toBe('ValidationError')
  })
})

afterAll(() => mongoose.connection.close())