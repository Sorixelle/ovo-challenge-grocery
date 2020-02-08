const createApp = require('./app')
const logger = require('./logger')
const Store = require('./store')

const ip = process.env.SERVER_IP || '0.0.0.0'
const port = process.env.SERVER_PORT || 8080

logger.info('Groceries server starting...')

const app = createApp(new Store(), logger)

app.listen(port, ip, () => {
  logger.info('Server running at %s:%d', ip, port)
})
