exports.up = function (knex) {
  return knex.schema.createTable("calendar_event", (table) => {
    table.increments("calendar_event_id").primary()
    table.string("title").notNullable()
    table.string("start_date").notNullable()
    table.string("end_date").notNullable()
    table.string("interval").defaultTo("weekly")
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("calendar_event")
}
