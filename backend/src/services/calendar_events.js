const knex = require("../db/connection")

async function listEvents() {
  return knex("calendar_event").select("*")
}

function post(calendar_event) {
  return knex("calendar_event as ce")
    .insert(calendar_event, "*")
    .then((e) => e[0])
}

module.exports = {
  listEvents,
  post,
}
