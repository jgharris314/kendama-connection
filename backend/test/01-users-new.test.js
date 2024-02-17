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
          password: "1twoThreeFour%",
          password_confirmation: "1twoThreeFour%",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("username")
      })
      test("returns 400 if username is already in use", async () => {
        const data = {
          username: "used",
          email: "usedEmail@test.com",
          password: "1twoThreeFour%",
          password_confirmation: "1twoThreeFour%",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("username")
      })
      test("returns 400 if email is missing", async () => {
        const data = {
          username: "xxx",
          email: "",
          password: "1twoThreeFour%",
          password_confirmation: "1twoThreeFour%",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("email")
      })
      test("returns 400 if email is already in use", async () => {
        const data = {
          username: "xxx",
          email: "used@test.com",
          password: "1twoThreeFour%",
          password_confirmation: "1twoThreeFour%",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("email")
      })
      test("returns 400 if password is missing", async () => {
        const data = {
          username: "xxx",
          email: "unusedEmail@test.com",
          password: "",
          password_confirmation: "1twoThreeFour%",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("password")
      })
      test("returns 400 if confirmation password is missing", async () => {
        const data = {
          username: "xxx",
          email: "unusedEmail@test.com",
          password: "1twoThreeFour&",
          password_confirmation: "",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("password_confirmation")
      })
      test("returns 400 if password is not at least 12 characters", async () => {
        const data = {
          username: "xxx",
          email: "unusedEmail@test.com",
          password: "1t",
          password_confirmation: "lt",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
      })
      test("returns 400 if password does not contain at least 1 uppercase letter", async () => {
        const data = {
          username: "xxx",
          email: "unusedEmail@test.com",
          password: "1twothreefour%",
          password_confirmation: "1twothreefour%",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
      })

      test("returns 400 if password does not contain at least 1 number", async () => {
        const data = {
          username: "xxx",
          email: "unusedEmail@test.com",
          password: "twothreefour%",
          password_confirmation: "twothreefour%",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
      })

      test("returns 400 if password does not contain at least 1 special character", async () => {
        const data = {
          username: "xxx",
          email: "unusedEmail@test.com",
          password: "twothreefour1",
          password_confirmation: "twothreefour1",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
      })
      test("returns 400 if password and confirmation do not match", async () => {
        const data = {
          username: "xxx",
          email: "unusedEmail@test.com",
          password: "twothreeFour1!",
          password_confirmation: "twothreeUour2&",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(400)
        expect(response.body.error).toContain("do not match")
      })

      test("returns 201 if the data is valid", async () => {
        const data = {
          username: "unusedName",
          email: "unusedEmail@test.com",
          password: "1twoThreeFour%",
          password_confirmation: "1twoThreeFour%",
        }
        const response = await request(app)
          .post("/users/new")
          .set("Accept", "application/json")
          .send(data)

        expect(response.status).toBe(201)
      })
    })
  })
})
