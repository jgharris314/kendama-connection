require("dotenv").config()
const path = require("path")

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const { DATABASE_URL_PROD, DATABASE_URL_DEV, DATABASE_URL_QA, DEBUG } =
  process.env

module.exports = {
  dev: {
    client: "postgresql",
    pool: { min: 1, max: 3 },
    connection: DATABASE_URL_DEV,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
    timezone: "utc",
  },
  qa: {
    client: "postgresql",
    pool: { min: 1, max: 3 },
    connection: DATABASE_URL_QA,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 3 },
    connection: DATABASE_URL_PROD,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
}
