const express = require('express')
require('express-async-errors')

const router = express.Router()

const Blog = require('../models/blog')
router.get('/:id',async (request,response) => {
  const id =  request.params.id
  const result = await Blog.findById(id)
  response.status(200).json(result)

})

router.get('/', (request, response, next) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs)
    })
    .catch((error) => next(error))
})

router.post('/', (request, response, next) => {
  const  post = request.body
  post.likes|= 0

  const blog = new Blog(post)

  blog
    .save()
    .then((result) => {

      response.status(200).json(result)
    })
    .catch((error) => next(error))
})

router.put('/:id',async (request,response) => {
  const id = request.params.id
  const post = request.body
  const data = await Blog.findByIdAndUpdate(id,post,{ new : true })

  response.status(200).json(data)


})

module.exports = router
