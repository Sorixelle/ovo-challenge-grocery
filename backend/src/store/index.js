class Store {
  constructor () {
    this._contents = {}
  }

  add (item, category, amount = 1) {
    if (amount <= 0) return

    if (!this._contents[item]) {
      this._contents[item] = {
        amount,
        category
      }
    } else {
      this._contents[item].amount += amount
      if (category) this.contents[item].category = category
    }
  }

  get (item) {
    return this._contents[item]
  }

  remove (item, amount) {
    if (amount <= 0) return

    if (amount && amount < this._contents[item].amount) {
      this._contents[item].amount -= amount
    } else {
      delete this._contents[item]
    }
  }
}

module.exports = Store
