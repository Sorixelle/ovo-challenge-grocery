const deleteRoute = (req, res) => {
  req.log.debug('DELETE /item/:itemName route triggered')
  req.log.trace('Deleting item: %s', req.params.itemName)

  if (!req.store.get(req.params.itemName)) {
    res.status(404).json({
      error: `Item "${req.params.itemName}" does not exist`
    })
    return
  }

  req.store.remove(req.params.itemName)

  res.json({})
}

module.exports = deleteRoute
