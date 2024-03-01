exports.up = function (knex) {
  return knex.schema.createTable("calendar_event", (table) => {
    table.increments("calendar_event_id").primary()
    table.string("title").notNullable()
    table.string("start_date").notNullable()
    table.string("end_date").notNullable()
    table.string("interval").defaultTo("one-off")
    table.string("location_name").notNullable()
    table.string("location_city_state").notNullable()
    table.string("hosted_by").notNullable()
    table.string("description")
    table
      .integer("user_id")
      .notNullable()
      .references("user_id")
      .inTable("user")
      .onDelete("CASCADE")
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("calendar_event")
}
