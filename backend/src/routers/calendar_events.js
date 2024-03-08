const router = require("express").Router()
const controller = require("../controllers/calendar_events")
const methodNotAllowed = require("../errors/methodNotAllowed")
router
  .route("/locations")
  .get(controller.getEventLocations)
  .all(methodNotAllowed)
router.route("/new").post(controller.post).all(methodNotAllowed)
router
  .route("/remove/:calendar_event_id")
  .delete(controller.delete)
  .all(methodNotAllowed)
router
  .route("/update/:calendar_event_id")
  .put(controller.put)
  .all(methodNotAllowed)
router
  .route("/user/:user_id")
  .get(controller.listEventsByUserId)
  .all(methodNotAllowed)
router
  .route("/:location_city_state")
  .get(controller.listEvents)
  .all(methodNotAllowed)

module.exports = router
