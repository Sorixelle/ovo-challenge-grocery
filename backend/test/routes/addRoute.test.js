const supertest = require('supertest')
const createApp = require('../../src/app')
const logger = require('../../src/logger')
const Store = require('../../src/store')

const store = new Store()
const app = createApp(store, logger)

describe('/add', () => {
  const request = supertest.agent(app)
    .type('json')

  test('should respond with 200 when submitting an item', () => {
    return request.post('/add')
      .send({
        item: 'test'
      }).expect(200, {
        item: 'test',
        quantity: 1,
        category: null
      })
  })

  test('should respond with 400 when submitting an invalid item', () => {
    return request.post('/add')
      .send({
        invalid: 'item'
      }).expect(400, {
        error: 'Invalid item'
      })
  })

  test('should respond with 400 when submitting an item with a name that already exists', () => {
    return request.post('/add')
      .send({
        item: 'test2'
      }).then(_ => {
        return request.post('/add')
          .send({
            item: 'test2'
          }).expect(400, {
            error: 'Item "test2" already exists'
          })
      })
  })
})
