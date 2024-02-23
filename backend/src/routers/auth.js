const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth")
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/current").get(controller.current).all(methodNotAllowed)
router.route("/logout").post(controller.logout).all(methodNotAllowed)
router.route("/login").post(controller.login).all(methodNotAllowed)

module.exports = router
