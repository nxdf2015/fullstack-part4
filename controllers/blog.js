const express = require('express')
require('express-async-errors')

const router = express.Router()
/**
 * get /:id  :  get a blog
 * delete /:id  : remove a blog
 * get /  :  get all blog
 * post / :  create a blog
 * put /  : update a blog
 * patch /:id/:likes : update number of like of a blog
 */

const Blog = require('../models/blog')


router.get('/:id',async (request,response) => {
  const id =  request.params.id

  const result = await Blog.findById(id)
  if (!result){
    throw new TypeError()
  }
  response.status(200).json(result)

})



router.get('/', async  (request, response) => {
  const result = await  Blog.find({})

  response.status(200).json(result)

})

router.delete('/:id',async (request,response) => {
  const id = request.params.id

  await Blog.findByIdAndRemove(id)

  response.status(200).end()

})

router.post('/', async (request, response) => {
  const  post = request.body
  post.likes|= 0

  const blog = new Blog(post)

  const result = await blog.save()

  response.status(200).json(result)

})

router.patch('/:id/:likes',async (request,response) => {
  const { id,likes } = request.params
  const result = await Blog.findByIdAndUpdate(id,{ $set: { likes : likes } }, { new: true ,overwrite:true,runValidators:true } )
  response.status(200).json(result)
})

router.put('/:id',async (request,response) => {
  const id = request.params.id
  const post = request.body

  const data = await Blog.findByIdAndUpdate(id,post,{ new : true , runValidators:true })

  response.status(200).json(data)
})

module.exports = router
