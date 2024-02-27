const request = require("supertest")

const app = require("../src/app")
const knex = require("../src/db/connection")
const { default: test } = require("node:test")

const validEventData = {
  title: "mothDama",
  start_date: "Wed Feb 21 2024 17:05:06 GMT-0700 (Mountain Standard Time)",
  end_date: "Wed Feb 21 2024 18:00:00 GMT-0700 (Mountain Standard Time)",
  interval: "monthly",
  location_name: "Cheeseman Park",
  location_city_state: "Denver, CO",
  description: "monthly mothdama meetup",
}

describe("General Error handling tests", () => {
  beforeAll(() => {
    return knex.migrate
      .forceFreeMigrationsLock()
      .then(() => knex.migrate.rollback(null, true))
      .then(() => knex.migrate.latest())
  })

  beforeEach(() => {
    return knex.seed.run()
  })

  afterAll(async () => {
    return await knex.migrate.rollback(null, true).then(() => knex.destroy())
  })

  describe("/calendarEvents", () => {
    describe("GET", async () => {
      test("returns 200 with all events if param = all", async () => {
        const response = await request(app)
          .get("/calendarEvents/all")
          .set("Accept", "application/json")

        expect(response.status).toBe(200)
      })
    })
  })
})
