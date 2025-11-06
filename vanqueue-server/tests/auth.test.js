const { before, after, afterEach, describe, it } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret";
process.env.CLIENT_URL = "http://localhost:5173";

const connectDatabase = require("../src/config/database");
const app = require("../src/app");
const { Passenger } = require("../src/models");

describe("Auth API", () => {
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();
    await connectDatabase();
  });

  afterEach(async () => {
    await Passenger.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("registers a new passenger and returns token", async () => {
    const payload = {
      name: "Somchai Jaidee",
      email: "somchai@example.com",
      phone: "0812345678",
      password: "pass1234",
    };

    const response = await request(app).post("/api/auth/register").send(payload);

    assert.equal(response.status, 201);
    assert.equal(response.body.success, true);
    assert.ok(response.body.data?.token);
    const passenger = await Passenger.findOne({ email: payload.email });
    assert.ok(passenger);
    assert.equal(passenger.role, "passenger");
  });

  it("rejects duplicate email registration", async () => {
    const payload = {
      name: "Somchai",
      email: "duplicate@example.com",
      phone: "0811111111",
      password: "pass1234",
    };

    await request(app).post("/api/auth/register").send(payload);
    const response = await request(app).post("/api/auth/register").send(payload);

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
    assert.match(response.body.message, /already/i);
  });

  it("logs in an existing user", async () => {
    const payload = {
      name: "Somchai",
      email: "login@example.com",
      phone: "0811111111",
      password: "pass1234",
    };

    await request(app).post("/api/auth/register").send(payload);
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: payload.email, password: payload.password });

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.ok(response.body.token);
    assert.equal(response.body.user.email, payload.email);
  });

  it("rejects invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "missing@example.com", password: "wrongpass" });

    assert.equal(response.status, 401);
    assert.equal(response.body.success, false);
  });

  it("returns profile data for authenticated request", async () => {
    const registerResponse = await request(app).post("/api/auth/register").send({
      name: "Profile User",
      email: "profile@example.com",
      phone: "0819999999",
      password: "pass1234",
    });

    const { token } = registerResponse.body.data;

    const profileResponse = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    assert.equal(profileResponse.status, 200);
    assert.equal(profileResponse.body.success, true);
    assert.equal(profileResponse.body.data.email, "profile@example.com");
    assert.equal(profileResponse.body.data.role, "passenger");
  });
});
