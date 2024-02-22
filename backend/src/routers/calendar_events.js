const router = require("express").Router()
const controller = require("../controllers/calendar_events")
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/").get(controller.listEvents).all(methodNotAllowed)
router.route("/new").post(controller.post).all(methodNotAllowed)

module.exports = router
