const request = require("supertest")

const app = require("../src/app")
const knex = require("../src/db/connection")

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
    describe("POST /users/new", () => {
      test("returns 400 if title is missing", async () => {
        const data = { ...validEventData, title: "" }
        const response = await request(app)
          .post("/calendarEvents/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("title")
      })

      test("returns 400 if start date is missing", async () => {
        const data = { ...validEventData, start_date: "" }
        const response = await request(app)
          .post("/calendarEvents/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("start_date")
      })

      test("returns 400 if end date is missing", async () => {
        const data = { ...validEventData, end_date: "" }
        const response = await request(app)
          .post("/calendarEvents/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("end_date")
      })
      test("returns 400 if location name is missing", async () => {
        const data = { ...validEventData, location_name: "" }
        const response = await request(app)
          .post("/calendarEvents/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("location_name")
      })
      test("returns 400 if location_city_state is missing", async () => {
        const data = { ...validEventData, location_city_state: "" }
        const response = await request(app)
          .post("/calendarEvents/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("location_city_state")
      })

      test("returns 400 if start date is after end date", async () => {
        const data = {
          ...validEventData,
          end_date: validEventData.start_date,
          start_date: validEventData.end_date,
        }
        const response = await request(app)
          .post("/calendarEvents/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("must be before")
      })

      test("returns 201 if the data is valid", async () => {
        const response = await request(app)
          .post("/calendarEvents/new")
          .set("Accept", "application/json")
          .send(validEventData)

        expect(response.status).toBe(201)
      })
    })
  })
})
