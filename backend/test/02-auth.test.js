const request = require("supertest")

const app = require("../src/app")
const knex = require("../src/db/connection")

describe("Auth tests", () => {
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
  const username = "unUsed"
  const password = "1twoThreeFour%"
  const createUserData = {
    username: username,
    email: "unUsed1@test.com",
    password: password,
    password_confirmation: password,
  }

  describe("Login", () => {
    test("returns 200 if user logs in with correct info", async () => {
      const created = await request(app)
        .post("/users/new")
        .set("Accept", "application/json")
        .send(createUserData)

      const loginData = { username, password }

      const loggedIn = await request(app)
        .post("/auth/login")
        .set("Accept", "application/json")
        .send(loginData)
      expect(loggedIn.status).toBe(200)
      expect(loggedIn.body.message).toContain("successfully")
    })

    test("returns 400 if user logs in with incorrect info", async () => {
      const created = await request(app)
        .post("/users/new")
        .set("Accept", "application/json")
        .send(createUserData)

      const loggedIn = await request(app)
        .post("/auth/login")
        .set("Accept", "application/json")
        .send({ username, password: "thisIsTheWrongPassword123@" })

      expect(loggedIn.status).toBe(400)
      expect(loggedIn.body.error).toContain("Invalid")
    })
  })

  describe("Logout", () => {
    test("returns 200 and logs the user out", async () => {
      const response = await request(app)
        .post("/auth/logout")
        .set("Accept", "application/json")
        .send({})

      expect(response.status).toBe(200)
      expect(response.body.message).toContain("successfully")
    })
  })

  describe("Current", () => {
    test("returns 401 if there is not a current session", async () => {
      const response = await request(app).get("/auth/current")

      expect(response.status).toBe(401)
      expect(response.text).toContain("Not authenticated")
    })

    //     test("returns 200 if there is a logged in session", async () => {
    //       const created = await request(app)
    //         .post("/users/new")
    //         .set("Accept", "application/json")
    //         .send(createUserData)

    //       const loginData = { username, password }

    //       const loggedIn = await request(app)
    //         .post("/auth/login")
    //         .set("Accept", "application/json")
    //         .send(loginData)

    //       const response = await request(app).get("/auth/current")

    //       console.dir(response)

    //       expect(response.status).toBe(200)
    //       expect(response.body.user.id).not.toBe(null)
    //       // expect(response.body.message).toContain("Not authenticated")
    //     })
    //   })
  })
})
