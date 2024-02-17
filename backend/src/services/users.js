const knex = require("../db/connection")

async function listUsers() {
  return knex("user").select("*")
}

function getUserByEmail(email) {
  return knex("user")
    .select("*")
    .where({ email })
    .then((e) => e[0])
}

function getUserByUsername(username) {
  return knex("user")
    .select("*")
    .where({ username })
    .then((e) => e[0])
}

function post(user) {
  return knex("user as u")
    .insert(user, "*")
    .then((e) => e[0])
}

module.exports = {
  listUsers,
  post,
  getUserByEmail,
  getUserByUsername,
}
