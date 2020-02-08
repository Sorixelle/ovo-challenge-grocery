const supertest = require('supertest')
const createApp = require('../../src/app')
const logger = require('../../src/logger')
const Store = require('../../src/store')

const store = new Store()
const app = createApp(store, logger)

describe('/items', () => {
  const request = supertest.agent(app)
    .type('json')

  store.add('test')
  store.add('test2', 'testItems')

  test('should return 200 and all existing items', () => {
    return request.get('/items')
      .expect(200, {
        items: [
          {
            item: 'test',
            category: null,
            quantity: 1
          },
          {
            item: 'test2',
            category: 'testItems',
            quantity: 1
          }
        ]
      })
  })

  test('should return 200 and all items with the specified category', () => {
    return request.get('/items')
      .query({ category: 'testItems' })
      .expect(200, {
        items: [
          {
            item: 'test2',
            category: 'testItems',
            quantity: 1
          }
        ]
      })
  })
})
