const express = require('express')
const expressPino = require('express-pino-logger')
const addRoute = require('./routes/add')
const util = require('./util')

function createApp (store, logger) {
  const app = express()
  app.use(expressPino({ logger }))
  app.use(express.json())
  app.use((res, req, next) => {
    res.store = store
    next()
  })

  app.use('/add', util.verifyItemMiddleware)
  app.post('/add', addRoute)

  return app
}

module.exports = createApp
