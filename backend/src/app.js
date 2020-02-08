const express = require('express')
const expressPino = require('express-pino-logger')
const util = require('./util')

const addRoute = require('./routes/add')
const bulkGetRoute = require('./routes/bulkGet')
const getRoute = require('./routes/get')
const updateRoute = require('./routes/update')

function createApp (store, logger) {
  const app = express()
  app.use(expressPino({ logger }))
  app.use(express.json())
  app.use((res, req, next) => {
    res.store = store
    next()
  })

  app.post('/add', util.verifyItemMiddleware(true))
  app.post('/add', addRoute)

  app.get('/item/:itemName', getRoute)

  app.get('/items', bulkGetRoute)

  app.patch('/item/:itemName', util.verifyItemMiddleware(false))
  app.patch('/item/:itemName', updateRoute)

  return app
}

module.exports = createApp
