class Store {
  constructor () {
    this._contents = {}
  }

  add (item, category = null, quantity = 1) {
    if (quantity <= 0) return

    this._contents[item] = {
      quantity,
      category
    }
  }

  get (item) {
    if (this._contents[item]) {
      return {
        ...this._contents[item],
        item
      }
    }
  }

  getAll (category) {
    const items = Object.keys(this._contents).map(k => this.get(k))

    if (category) {
      return items.filter(i => i.category === category)
    } else {
      return items
    }
  }

  remove (item) {
    delete this._contents[item]
  }
}

module.exports = Store
