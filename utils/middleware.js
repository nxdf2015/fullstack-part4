const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error(`error: ${error.name}`);
  logger.error('-----------');
  response.status(404).end(error.name);
  next();
};

const unknowEndpoint = (request, response) => {
  response.status(404).end();
};

const loggerMiddleware = (request, response, next) => {
  logger.info(`method: ${request.method}`);
  logger.info(`path: ${request.path}`);
  if (/post/i.test(request.method)) { logger.info(`body: ${JSON.stringify(request.body)}`); }
  logger.info('------------');
  next();
};

module.exports = { errorHandler, unknowEndpoint, loggerMiddleware };
