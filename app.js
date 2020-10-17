
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')
const routerBlog = require('./controllers/blog')
const config = require('./utils/config')


const app = express()
const { MONGODB_URI } = config

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

app.use(cors())
app.use(express.json())
app.use(middleware.loggerMiddleware)

app.use('/api/blogs', routerBlog)

app.use(middleware.unknowEndpoint)
app.use(middleware.errorHandler)


module.exports=app