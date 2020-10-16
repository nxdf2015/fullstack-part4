require('dotenv').config()

const user = process.env.user
const password = process.env.password
const PORT = process.env.PORT || 3003

module.exports={password , user , PORT}