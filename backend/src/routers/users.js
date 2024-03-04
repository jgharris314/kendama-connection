const router = require("express").Router()
const methodNotAllowed = require("../errors/methodNotAllowed")
const controller = require("../controllers/users")

router.route("/new").post(controller.post).all(methodNotAllowed)

router.route("/:user_id").get(controller.getUserById).all(methodNotAllowed)
router.route("/").get(controller.listUsers).all(methodNotAllowed)

module.exports = router
