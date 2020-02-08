const supertest = require('supertest')
const createApp = require('../src/app')
const logger = require('../src/logger')
const Store = require('../src/store')

const store = new Store()
const app = createApp(store, logger)

describe('/add', () => {
  const request = supertest.agent(app)
    .type('json')

  test('should respond with 200 when submitting an item', () => {
    return request.post('/add')
      .send({
        item: 'test'
      })
      .expect(200, {
        item: 'test',
        quantity: 1,
        category: null
      })
  })
})
