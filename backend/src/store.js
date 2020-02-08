class Store {
  constructor () {
    this._contents = {}
  }

  add (item, category = null, quantity = 1) {
    if (quantity <= 0) return

    if (!this._contents[item]) {
      this._contents[item] = {
        quantity,
        category
      }
    } else {
      this._contents[item].quantity += quantity
      if (category) this.contents[item].category = category
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

  remove (item, quantity) {
    if (quantity <= 0) return

    if (quantity && quantity < this._contents[item].quantity) {
      this._contents[item].quantity -= quantity
    } else {
      delete this._contents[item]
    }
  }
}

module.exports = Store
