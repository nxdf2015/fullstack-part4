const express =require('express')


const User = require('../models/user')
const Blog = require('../models/blog')
const router = express.Router()


router.get('/reset', async (request,response) => {
  try{

    await  User.deleteMany({})
    await Blog.deleteMany({})
    response.status(200).end()
  }
  catch(error){
    response.status(400).json(error)
  }

})


module.exports = router