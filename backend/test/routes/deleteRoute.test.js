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

  test('should return 200 if item was deleted', () => {
    return request.delete('/item/test')
      .expect(200, {})
  })

  test('should return 404 if item does not exist', () => {
    return request.delete('/item/nonexistent')
      .expect(404, {
        error: 'Item "nonexistent" does not exist'
      })
  })
})
