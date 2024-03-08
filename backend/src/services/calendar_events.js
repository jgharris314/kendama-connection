const knex = require("../db/connection")

function listAllEvents() {
  return knex("calendar_event").select("*")
}

function getEventByLocation(location_city_state) {
  return knex("calendar_event").select("*").where({ location_city_state })
}

function listEventsByUserId(user_id) {
  return knex("calendar_event").select("*").where({ user_id })
}

function getEventCreatorUserId(calendar_event_id) {
  return knex("calendar_event").select("user_id").where({ calendar_event_id })
}

function getEventsByInterval(interval) {
  return knex("calendar_event").select("*").where({ interval })
}

function getEventLocations() {
  const locationCol = "location_city_state"
  return knex("calendar_event").select(locationCol).orderBy(locationCol, "asc")
}

function post(calendar_event) {
  return knex("calendar_event as ce")
    .insert(calendar_event, "*")
    .then((e) => e[0])
}

function put(calendar_event) {
  return knex("calendar_event as ce")
    .where({ calendar_event_id: calendar_event.calendar_event_id })
    .update(calendar_event)
    .then((e) => e[0])
}

function destroy(calendar_event_id) {
  return knex("calendar_event").delete("*").where({ calendar_event_id })
}

module.exports = {
  listAllEvents,
  getEventByLocation,
  post,
  getEventLocations,
  getEventsByInterval,
  destroy,
  put,
  getEventCreatorUserId,
  listEventsByUserId,
}
