require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


const middleware = require("./utils/middleware")
const routerBlog = require("./controllers/blog")
const password=process.env.password
const mongoUrl = `mongodb+srv://admin:${password}@cluster0.llwdf.mongodb.net/bloglist?retryWrites=true&w=majority`
const PORT = process.env.PORT


mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })



app.use(cors())
app.use(express.json())
app.use(middleware.loggerMiddleware)

app.use("/api/blogs",routerBlog)

app.use(middleware.unknowEndpoint)
app.use(middleware.errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})