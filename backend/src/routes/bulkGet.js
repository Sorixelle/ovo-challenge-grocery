const bulkGetRoute = (req, res) => {
  req.log.debug('GET /items route triggered')

  const category = req.query.category
  if (category) {
    req.log.trace('Category specified: %s', category)
  } else {
    req.log.trace('No category specified')
  }

  res.json({
    items: req.store.getAll(category)
  })
}

module.exports = bulkGetRoute
