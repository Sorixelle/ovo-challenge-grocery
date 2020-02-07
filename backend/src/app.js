const express = require('express')
const expressPino = require('express-pino-logger')
const logger = require('./logger')

const app = express()

app.use(expressPino(logger))

module.exports = app
