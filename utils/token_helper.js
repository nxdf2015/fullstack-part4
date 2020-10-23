const  jwt = require('jsonwebtoken')
const  { SECRET }= require('./config')

const getToken  = string => {

  return string === undefined ? '' :string.slice(7,string.length)}


const decodeToken =  token =>  jwt.verify(token,SECRET)



module.exports = { getToken  ,decodeToken   }