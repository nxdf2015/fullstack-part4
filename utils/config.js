require('dotenv').config()
let { MONGODB_URI , SECRET } = process.env

const PORT = process.env.PORT || 3003
const NODE_ENV = process.env.NODE_ENV

if (process.env.NODE_ENV === 'test'){
  MONGODB_URI=process.env.MONGODB_URI_TEST
}


module.exports = { MONGODB_URI, PORT , SECRET, NODE_ENV }
