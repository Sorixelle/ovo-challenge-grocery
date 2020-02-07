const Store = require('../src/store')

/* eslint-disable no-unused-expressions */

describe('Store', () => {
  describe('.add()', () => {
    let store = new Store()

    beforeEach(() => {
      store = new Store()
    })

    test('should add an object to the store', () => {
      store.add('test')

      expect(store._contents.test).toEqual({
        amount: 1
      })
    })

    test('should add an object with a category to the store', () => {
      store.add('test', 'testItems')

      expect(store._contents.test).toEqual({
        amount: 1,
        category: 'testItems'
      })
    })

    test('should add a specified quantity of objects to the store', () => {
      store.add('test', undefined, 2)

      expect(store._contents.test).toEqual({
        amount: 2
      })
    })

    test('should increment existing items', () => {
      store.add('test')
      store.add('test')

      expect(store._contents.test).toEqual({
        amount: 2
      })
    })

    test('should increment existing items by a specified quantity', () => {
      store.add('test')
      store.add('test', undefined, 2)

      expect(store._contents.test).toEqual({
        amount: 3
      })
    })

    test('should do nothing if the specified quantity is less than 1', () => {
      store.add('test', undefined, -1)

      expect(store._contents.test).toBeUndefined()
    })
  })

  describe('.get()', () => {
    let store = new Store()

    beforeEach(() => {
      store = new Store()
      store.add('test', 'testItems', 1)
    })

    test('should get the specified item', () => {
      expect(store.get('test')).toEqual({
        amount: 1,
        category: 'testItems'
      })
    })

    test('should return undefined if the item does not exist', () => {
      expect(store.get('nonexistent')).toBeUndefined()
    })
  })

  describe('.remove()', () => {
    let store = new Store()

    beforeEach(() => {
      store = new Store()
      store.add('test', undefined, 2)
    })

    test('should remove all of one item with no quantity specified', () => {
      store.remove('test')

      expect(store._contents.test).toBeUndefined()
    })

    test('should remove the specified quantity of an item', () => {
      store.remove('test', 1)

      expect(store._contents.test).toEqual({
        amount: 1
      })
    })

    test('should remove all of one item if the specified quantity exceeds the stored quantity', () => {
      store.remove('test', 3)

      expect(store._contents.test).toBeUndefined()
    })

    test('should do nothing if the specified item does not exist', () => {
      store.remove('nonexistent')

      expect(store._contents.nonexistent).toBeUndefined()
    })

    test('should do nothing if the specified quantity is less than 1', () => {
      store.remove('test', -1)

      expect(store._contents.test).toEqual({
        amount: 2
      })
    })
  })
})
