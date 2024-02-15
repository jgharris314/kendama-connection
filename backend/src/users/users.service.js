const knex = require("../db/connection")

async function listUsers() {
  return knex("user").select("*")
}

module.exports = {
  listUsers,
}
