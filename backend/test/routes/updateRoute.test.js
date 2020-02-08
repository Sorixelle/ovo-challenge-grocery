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

  test('should return 200 after updating item and return updated item', () => {
    return request.patch('/item/test')
      .send({
        quantity: 2,
        category: 'testItems'
      }).expect(200, {
        item: 'test',
        category: 'testItems',
        quantity: 2
      })
  })

  test('should return 404 if the item to update does not exist', () => {
    return request.patch('/item/nonexistent')
      .send({
        quantity: 2,
        category: 'testItems'
      }).expect(404, {
        error: 'Item "nonexistent" does not exist'
      })
  })
})
