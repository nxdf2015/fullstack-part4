const express =require('express')


const User = require('../models/user')

const router = express.Router()


router.get('/reset', (request,response) => {
  User.deleteMany({}).then(() => response.status(200).end())
    .catch(() => response.status(400))
})


module.exports = router