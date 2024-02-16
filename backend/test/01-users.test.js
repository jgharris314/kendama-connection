const request = require("supertest")

const app = require("../src/app")
const knex = require("../src/db/connection")

describe("User tests", () => {
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

  describe("User", () => {
    describe("POST /users/new", () => {
      test("returns 400 if username is missing", async () => {
        const data = {
          username: "",
          email: "unusedEmail@test.com",
          passord: "1twoThreeFour%",
          passord_confirmation: "1twoThreeFour%",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send({ data })

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("username")
      })
      test("returns 400 if username is already in use", async () => {})
      test("returns 400 if email is missing", async () => {})
      test("returns 400 if email is already in use", async () => {})
      test("returns 400 if password is missing", async () => {})
      test("returns 400 if confirmation password is missing", async () => {})
      test("returns 400 if password is not at least 12 characters", async () => {})
      test("returns 400 if password does not contain at least 1 uppercase letter", async () => {})
      test("returns 400 if password does not contain at least 1 number", async () => {})
      test("returns 400 if password does not contain at least 1 special character", async () => {})
      test("returns 400 if password and confirmation do not match", async () => {})
      test("returns 201 if the data is valid", async () => {})
      //   test("returns 404 for non-existent route", async () => {
      //     const response = await request(app)
      //       .get("/thisRouteWillNeverExist")
      //       .set("Accept", "application/json")

      //     expect(response.status).toBe(404)
      //     expect(response.body.error).toBe(
      //       "Path not found: /thisRouteWillNeverExist"
      //     )
      //   })
    })
  })
})
