import { BasicMemberhsipCreationLimit } from "../../constants"

exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("user_id").primary()
    table.string("email").notNullable().unique()
    table.string("username").notNullable().unique()
    table.string("password").notNullable()
    table.string("membership_type").defaultTo("basic")
    table
      .integer("calendar_event_creation_limit")
      .defaultTo(BasicMemberhsipCreationLimit)
    table
      .integer("remaining_calendar_event_creations")
      .defaultTo(BasicMemberhsipCreationLimit)
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("user")
}
