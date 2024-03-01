const knex = require("../db/connection")

const userSafeFields = [
  "email",
  "user_id",
  "username",
  "membership_type",
  "remaining_calendar_event_creations",
]

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

function getUserById(user_id) {
  return knex("user")
    .select("*")
    .where({ user_id })
    .then((e) => e[0])
}

function post(user) {
  return knex("user as u")
    .insert(user, "*")
    .then((e) => e[0])
}

function update(user_id, updateData) {
  return knex("user")
    .update(updateData, "*")
    .where({ user_id })
    .then((e) => e[0])
}

module.exports = {
  listUsers,
  post,
  getUserByEmail,
  getUserByUsername,
  getUserById,
  update,
}
