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
        quantity: 1,
        category: null
      })
    })

    test('should add an object with a category to the store', () => {
      store.add('test', 'testItems')

      expect(store._contents.test).toEqual({
        quantity: 1,
        category: 'testItems'
      })
    })

    test('should add a specified quantity of objects to the store', () => {
      store.add('test', null, 2)

      expect(store._contents.test).toEqual({
        quantity: 2,
        category: null
      })
    })

    test('should update existing items', () => {
      store.add('test', null, 1)
      store.add('test', 'testItems', 2)

      expect(store._contents.test).toEqual({
        quantity: 2,
        category: 'testItems'
      })
    })

    test('should do nothing if the specified quantity is less than 1', () => {
      store.add('test', null, -1)

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
        item: 'test',
        quantity: 1,
        category: 'testItems'
      })
    })

    test('should return undefined if the item does not exist', () => {
      expect(store.get('nonexistent')).toBeUndefined()
    })
  })

  describe('.getAll()', () => {
    let store = new Store()

    beforeEach(() => {
      store = new Store()
    })

    test('should get all existing items', () => {
      store.add('test')
      store.add('test2')

      expect(store.getAll()).toEqual([
        {
          item: 'test',
          category: null,
          quantity: 1
        },
        {
          item: 'test2',
          category: null,
          quantity: 1
        }
      ])
    })

    test('should return all items with given category', () => {
      store.add('test')
      store.add('test2', 'testItems')

      expect(store.getAll('testItems')).toEqual([
        {
          item: 'test2',
          category: 'testItems',
          quantity: 1
        }
      ])
    })

    test('should return an empty array if store is empty', () => {
      expect(store.getAll()).toEqual([])
    })
  })

  describe('.remove()', () => {
    let store = new Store()

    beforeEach(() => {
      store = new Store()
      store.add('test', null, 1)
    })

    test('should remove all of one item with no quantity specified', () => {
      store.remove('test')

      expect(store._contents.test).toBeUndefined()
    })

    test('should do nothing if the specified item does not exist', () => {
      store.remove('nonexistent')

      expect(store._contents.nonexistent).toBeUndefined()
    })
  })
})
