const updateRoute = (req, res) => {
  req.log.debug('PATCH /item/:itemName route triggered')
  req.log.trace('Updating item: %s', req.params.itemName)

  const item = req.store.get(req.params.itemName)
  if (!item) {
    res.status(404).json({
      error: `Item "${req.params.itemName}" does not exist`
    })
    return
  }

  const newItem = {
    ...item,
    ...req.body
  }

  req.store.add(newItem.item, newItem.category, newItem.quantity)

  res.json(newItem)
}

module.exports = updateRoute
