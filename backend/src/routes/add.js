const addRoute = (req, res) => {
  req.log.debug('POST /add route triggered')
  req.log.trace(req.body, 'Adding item')

  const { item, quantity, category } = req.body
  req.store.add(item, category, quantity)

  res.json(req.store.get(req.body.item))
}

module.exports = addRoute
