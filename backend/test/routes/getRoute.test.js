const supertest = require('supertest')
const createApp = require('../../src/app')
const logger = require('../../src/logger')
const Store = require('../../src/store')

const store = new Store()
const app = createApp(store, logger)

describe('/item/:itemName', () => {
  const request = supertest.agent(app)
    .type('json')

  store.add('test')

  test('should respond with 200 when getting an existing item', () => {
    return request.get('/item/test')
      .expect(200, {
        item: 'test',
        quantity: 1,
        category: null
      })
  })

  test('should respond with 404 when getting a nonexistent item', () => {
    return request.get('/item/nonexistent')
      .expect(404, {
        error: 'Item "nonexistent" does not exist'
      })
  })
})
