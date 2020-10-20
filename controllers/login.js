const express = require('express')
const bcrypt = require('bcrypt')
const jswt = require('jsonwebtoken')

const SECRET = require('../utils/config').SECRET
const User = require('../models/user')
const routerLogin = express.Router()

routerLogin.post('/', async (request, response) => {
  const user = request.body

  const result = await User.findOne({ username: user.username })

  const valid =
    result === null
      ? false
      : await bcrypt.compare(user.password, result.password)

  if (valid) {
    const token = jswt.sign({ username : user.username, id : result._id } , SECRET)

    response.status(200)
    response.set('Authorization',`Bearer ${token}`)
    response.json({ token })
  } else {
    throw new Error()
  }
})

module.exports = routerLogin
