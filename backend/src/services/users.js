const knex = require("../db/connection")

const userSafeFields = ["email", "user_id", "username", "membership_type"]

async function listUsers() {
  return knex("user").select(userSafeFields)
}

function getUserByEmail(email) {
  return knex("user")
    .select(userSafeFields)
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
