const calendar_events = require("./calendar_events.json")

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE public.calendar_event RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("calendar_event").insert(calendar_events)
    })
}
