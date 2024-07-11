// utils/middleware.js
const morgan = require('morgan');
const logger = require('./logger');

// Create a stream object with a 'write' function that will be used by Morgan
const stream = {
  write: (message) => logger.info(message.trim())
};

// Create Morgan middleware
const morganMiddleware = morgan('combined', { stream });

module.exports = morganMiddleware;
