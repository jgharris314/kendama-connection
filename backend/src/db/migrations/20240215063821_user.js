exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("user_id").primary()
    table.string("email").notNullable()
    table.string("username").notNullable()
    table.string("password").notNullable()
    table.string("membership_type").defaultTo("basic")
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("user")
}
