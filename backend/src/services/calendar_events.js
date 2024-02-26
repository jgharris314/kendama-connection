const knex = require("../db/connection")

async function listAllEvents() {
  return knex("calendar_event").select("*")
}

async function getEventByLocation(location_city_state) {
  return knex("calendar_event").select("*").where({ location_city_state })
}

async function getEventLocations() {
  return knex("calendar_event").select("location_city_state")
}

function post(calendar_event) {
  return knex("calendar_event as ce")
    .insert(calendar_event, "*")
    .then((e) => e[0])
}

module.exports = {
  listAllEvents,
  getEventByLocation,
  post,
  getEventLocations,
}
