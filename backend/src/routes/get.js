const getRoute = (req, res) => {
  req.log.debug('GET /item/:itemName route triggered')
  req.log.trace('Getting item %s', req.params.itemName)

  const item = req.store.get(req.params.itemName)

  if (item) {
    res.json(item)
  } else {
    res.status(404).json({
      error: `Item "${req.params.itemName}" does not exist`
    })
  }
}

module.exports = getRoute
