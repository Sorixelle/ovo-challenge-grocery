const express = require('express')
const expressPino = require('express-pino-logger')
const util = require('./util')

const addRoute = require('./routes/add')
const bulkGetRoute = require('./routes/bulkGet')
const getRoute = require('./routes/get')

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

  app.get('/item/:itemName', getRoute)

  app.get('/items', bulkGetRoute)

  return app
}

module.exports = createApp
