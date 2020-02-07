const app = require('./app')
const logger = require('./logger')

const ip = process.env.SERVER_IP || '0.0.0.0'
const port = process.env.SERVER_PORT || 8080

logger.info('Groceries server starting...')

app.listen(port, ip, () => {
  logger.info('Server running at %s:%d', ip, port)
})
