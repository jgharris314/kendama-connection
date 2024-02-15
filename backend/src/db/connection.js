const environment = process.env.NODE_ENV || "dev"
const config = require("../../knexfile")[environment]
const knex = require("knex")(config)

module.exports = knex
