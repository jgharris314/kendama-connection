const knex = require("../db/connection")

async function listUsers() {
  return knex("user").select("*")
}

function post(user) {
  return knex("user as u")
    .insert(user, "*")
    .then((e) => e[0])
}

module.exports = {
  listUsers,
  post,
}
