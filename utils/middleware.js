const jwt = require('jsonwebtoken')

const logger = require('./logger')
const { getToken } = require('./token_helper')
const SECRET = require('../utils/config').SECRET

const errorHandler = (error, request, response, next) => {
  if (process.env.NODE_ENV !== 'test') {
    logger.error(`error: ${error.name}`)
    logger.error('-----------')
  }

  let status = 404
  if (
    error.name === 'ValidationError' ||
    error.name === 'TypeError' ||
    error.name === 'CastError' ||
    error.name === 'AuthorizationError'
  ) {
    status = 400
  }
  response.status(status).send(error.name)

  next()
}

const unknowEndpoint = (request, response) => {
  response.status(404).end()
}

const loggerMiddleware = (request, response, next) => {
  if (process.env.NODE_ENV !== 'test') {
    logger.info(`method: ${request.method}`)
    logger.info(`path: ${request.path}`)
    if (/post/i.test(request.method)) {
      logger.info(`body: ${JSON.stringify(request.body)}`)
    }
    logger.info('------------')
  }
  next()
}

const tokenExtractor =  (request, response, next) => {

  const token = getToken(request.get('Authorization'))
  if(token){
    const decodeToken = jwt.verify(token , SECRET)

    if (decodeToken && decodeToken.id && decodeToken.username){
      request.token = decodeToken
    }

  }
  next()



}

const verifyToken = (request,response,next) => {
  const token = request.token
  if (token === null || token.id === null ){
    const error = new Error()
    error.name = 'AuthorizationError'
    throw error

  }
  else {
    next()
  }
}




module.exports = {
  errorHandler,
  unknowEndpoint,
  loggerMiddleware,
  tokenExtractor,
  verifyToken
}
