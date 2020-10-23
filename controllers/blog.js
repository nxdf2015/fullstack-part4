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
const middleware = require('../utils/middleware')

router.get('/:id', async (request, response) => {
  const id = request.params.id

  const result = await Blog.findById(id)
  if (!result) {
    throw new TypeError()
  }
  response.status(200).json(result)
})

router.get('/', async (request, response) => {
  const result = await Blog.find(
    {},
    { title: 1, url: 1, author: 1, likes: 1, user: 1 }
  ).populate('user', { username: 1, name: 1, _id: 0 })

  response.status(200).json(result)
})

router.delete('/:id', middleware.verifyToken, async (request, response) => {
  const id = request.params.id

  await Blog.findOneAndRemove({ _id: id, user: request.token.id })

  response.status(200).end()
})

router.post('/', middleware.verifyToken, async (request, response) => {
  const post = request.body
  post.likes |= 0

  const token = request.token

  const user = await User.findOne({ _id: token.id })
  const blog = new Blog({ ...post, user: user._id })
  const result = await blog.save()

  response.status(200).json(result)
})

router.patch(
  '/:id/:likes',
  middleware.verifyToken,
  async (request, response) => {
    const { id, likes } = request.params
    const result = await Blog.findByIdAndUpdate(
      id,
      { $set: { likes: likes } },
      { new: true, overwrite: true, runValidators: true }
    )
    response.status(200).json(result)
  }
)

router.put('/:id', middleware.verifyToken, async (request, response) => {
  const id = request.params.id
  const post = request.body

  const data = await Blog.findOneAndUpdate(
    { _id: id, user: request.token.id },
    post,
    {
      new: true,
      runValidators: true,
    }
  )

  response.status(200).json(data)
})

module.exports = router
