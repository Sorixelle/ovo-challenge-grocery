const util = require('../src/util')

describe('util', () => {
  describe('.verifyItem()', () => {
    test('should pass on an item with only a name', () => {
      const passed = util.verifyItem({
        item: 'test'
      })

      expect(passed).toBe(true)
    })

    test('should fail on an item without a name', () => {
      const passed = util.verifyItem({
        quantity: 1
      })

      expect(passed).toBe(false)
    })

    test('should fail if item is not a string', () => {
      const passed = util.verifyItem({
        item: 0
      })

      expect(passed).toBe(false)
    })

    test('should pass on an item with a name and quantity', () => {
      const passed = util.verifyItem({
        item: 'test',
        quantity: 1
      })

      expect(passed).toBe(true)
    })

    test('should fail is quantity is not a number', () => {
      const passed = util.verifyItem({
        item: 'test',
        quantity: '1'
      })

      expect(passed).toBe(false)
    })

    test('should pass on an item with a name and category', () => {
      const passed = util.verifyItem({
        item: 'test',
        category: 'testItems'
      })

      expect(passed).toBe(true)
    })

    test('should fail if category is not a string', () => {
      const passed = util.verifyItem({
        item: 'test',
        category: 0
      })

      expect(passed).toBe(false)
    })

    test('should pass on an item with a name, quantity and category', () => {
      const passed = util.verifyItem({
        item: 'test',
        quantity: 1,
        category: 'testItems'
      })

      expect(passed).toBe(true)
    })

    test('should fail if an unknown property is found', () => {
      const passed = util.verifyItem({
        item: 'test',
        unknown: 'property'
      })

      expect(passed).toBe(false)
    })

    test('should pass on an item without a name with strict mode off', () => {
      const passed = util.verifyItem({
        quantity: 1
      }, false)

      expect(passed).toBe(true)
    })
  })

  describe('.verifyItemMiddleware()', () => {
    const jsonMock = jest.fn(body => {})
    const nextMock = jest.fn(() => {})

    const req = {
      log: {
        trace: () => {}
      }
    }

    const res = {
      status: () => ({
        json: jsonMock
      })
    }

    afterEach(() => {
      delete req.body
      jsonMock.mockClear()
      nextMock.mockClear()
    })

    test('should proceed if item is valid with strict mode on', () => {
      req.body = {
        item: 'test',
        quantity: 1,
        category: 'testItems'
      }

      util.verifyItemMiddleware(true)(req, res, nextMock)

      expect(jsonMock.mock.calls.length).toBe(0)
      expect(nextMock.mock.calls.length).toBe(1)
    })

    test('should proceed if item is valid with strict mode off', () => {
      req.body = {
        quantity: 1,
        category: 'testItems'
      }

      util.verifyItemMiddleware(false)(req, res, nextMock)

      expect(jsonMock.mock.calls.length).toBe(0)
      expect(nextMock.mock.calls.length).toBe(1)
    })

    test('should stop is item is empty', () => {
      req.body = {}

      util.verifyItemMiddleware(true)(req, res, nextMock)

      expect(nextMock.mock.calls.length).toBe(0)
      expect(jsonMock.mock.calls[0][0]).toEqual({
        error: 'Invalid item'
      })
    })
  })
})
