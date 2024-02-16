function validateUserData(req, res, next) {
  const data = req.body.data
  console.dir(data, { depth: null })
  next()
}

module.exports = { validateUserData }
