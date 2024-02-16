function validateUserData(req, res, next) {
  const data = req.body.data
  console.dir(data, { depth: null })

  if (!data.username) {
    return next({ status: 400, message: "username is missing" })
  }

  next()
}

module.exports = { validateUserData }
