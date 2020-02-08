function verifyItem (obj) {
  const containsItem = Object.prototype.hasOwnProperty.call(obj, 'item')
  const itemIsString = typeof obj.item === 'string'
  const quantityIsOptionallyNumber =
    !Object.prototype.hasOwnProperty.call(obj, 'quantity') || typeof obj.quantity === 'number'
  const categoryIsOptionallyString =
    !Object.prototype.hasOwnProperty.call(obj, 'category') || typeof obj.category === 'string'

  const invalidKeys = Object.keys(obj).filter(
    k => k !== 'item' && k !== 'quantity' && k !== 'category'
  )
  const hasNoInvalidKeys = invalidKeys.length <= 0

  return containsItem &&
    itemIsString &&
    quantityIsOptionallyNumber &&
    categoryIsOptionallyString &&
    hasNoInvalidKeys
}

const verifyItemMiddleware = (req, res, next) => {
  req.log.trace(req.body, 'Verifying item')

  if (!verifyItem(req.body)) {
    res.status(400).json({
      error: 'Invalid item'
    })
  } else {
    next()
  }
}

module.exports = {
  verifyItem,
  verifyItemMiddleware
}
