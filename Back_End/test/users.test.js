const request = require("supertest");
const app = require("../app");

//--------------------------------------------------
//Register
//--------------------------------------------------
describe("Test POST /user", () => {
  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/api/v1/user")
      .send({
        firstName: "Lakshitha",
        lastName: "Madushanka",
        email: "kgalmadushanka@gmail.com",
        password: "test1",
      })
      .expect(201);
  });
});
