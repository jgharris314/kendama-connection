const users = require("./users.json")

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE public.user RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("user").insert(users)
    })
}
