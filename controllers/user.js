const express = require('express')
const bcrypt = require('bcrypt')
require('express-async-errors')

const User = require('../models/user')

const UserRouter = express.Router()
const saltRounds = 10

UserRouter.get('/', async (request, response) => {

  const users = await User.find({} , { name: 1, username: 1 })
  response.status(200).json(users)
})

UserRouter.post('/', async (request, response,next) => {

  const { username, name, password } = request.body
  if ( password  && username) {
    if (password.length < 3){
      const error = new Error('min length of password is 3')
      error.name='ValidationError'
      next(error)
    }
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({ name, username, password: passwordHash })
    const result = await user.save()

    response.status(200).json(result)
  }
  else {
    const error = new Error('password and username required')
    error.name='ValidationError'
    next(error)
  }
})

module.exports = UserRouter
