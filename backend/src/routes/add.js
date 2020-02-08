const addRoute = (req, res) => {
  req.log.debug('POST /add route triggered')
  req.log.trace(req.body, 'Adding item')

  const { item, quantity, category } = req.body
  if (req.store.get(item)) {
    res.status(400).json({
      error: `Item "${item}" already exists`
    })
  }

  req.store.add(item, category, quantity)

  res.json(req.store.get(req.body.item))
}

module.exports = addRoute
