require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const routerBlog = require('./controllers/blog')
const config = require('./utils/config')
const { info } = require('./utils/logger')

const app = express()
const { password, user, PORT } = config

const mongoUrl = `mongodb+srv://${user}:${password}@cluster0.llwdf.mongodb.net/bloglist?retryWrites=true&w=majority`

mongoose.connect(mongoUrl, {
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

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
