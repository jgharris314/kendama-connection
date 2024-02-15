const router = require("express").Router()
const methodNotAllowed = require("../errors/methodNotAllowed")
const controller = require("./users.controller")

router.route("/").get(controller.listUsers).all(methodNotAllowed)

module.exports = router
