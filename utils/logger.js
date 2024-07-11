// utils/logger.js
const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure log directory exists
const logDirectory = process.env.LOG_DIRECTORY || './logs';
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Define logger configuration
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDirectory, process.env.ERROR_LOG_FILE_NAME || 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, process.env.COMBINED_LOG_FILE_NAME || 'combined.log')
    })
  ]
});

module.exports = logger;
