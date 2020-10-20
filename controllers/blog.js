const express = require('express')
require('express-async-errors')

const User = require('../models/user')

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

router.get('/:id', async (request, response) => {
  const id = request.params.id

  const result = await Blog.findById(id)
  if (!result) {
    throw new TypeError()
  }
  response.status(200).json(result)
})

router.get('/', async (request, response) => {
  const { id } = request.token

  const result = await Blog.find(
    { user: id },
    { title: 1, link: 1, likes: 1 ,user: 1 }
  ).populate('user', { username: 1, name: 1 , _id : 0 })
  console.log(result)
  response.status(200).json(result)
})

router.delete('/:id', async (request, response ) => {
  const id = request.params.id

  if ( !(request.token && await Blog.findOneAndRemove({ _id : id, user : request.token.id }  )) ){
    const error = new Error()
    error.name = 'NonAuthorized'
    throw error
  }

  response.status(200).end()
})

router.post('/', async (request, response) => {
  const post = request.body
  post.likes |= 0

  /**
   *
   */
  // find id of the first user
  const user = await User.find({})

  const blog = new Blog({ ...post, user: user[0]._id })

  const result = await blog.save()

  response.status(200).json(result)
})

router.patch('/:id/:likes', async (request, response) => {
  const { id, likes } = request.params
  const result = await Blog.findByIdAndUpdate(
    id,
    { $set: { likes: likes } },
    { new: true, overwrite: true, runValidators: true }
  )
  response.status(200).json(result)
})

router.put('/:id', async (request, response) => {
  const id = request.params.id
  const post = request.body

  const data = await Blog.findByIdAndUpdate(id, post, {
    new: true,
    runValidators: true,
  })

  response.status(200).json(data)
})

module.exports = router
