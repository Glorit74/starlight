require("dotenv").config();
const app = require("../app");
const mockserver = require("supertest");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const Actor = require("../models/actor");
const { startDb, stopDb, deleteAll } = require("../utils/inMemoryDb");
const {
  setupGoogleSuccessResponse,
  setupGoogleErrorResponse,
} = require("../utils/httpMock");
const { login } = require("../utils/login");

describe("/api/actor tests", () => {
  let connection;
  let mongod;
  let client;

  beforeAll(async () => {
    [connection, mongod] = await startDb();
    client = mockserver.agent(app);
  });

  afterEach(async () => {
    await deleteAll(Actor);
  });

  afterAll(async () => {
    await stopDb(connection, mongod);
  });

  test("1. should return 400, when no name", async () => {
    //given

    const title = "";
    const description = "abc";

    //when
    const response = await client.post("/api/actor").send({
      title,
      description,
    });

    //then
    expect(response.status).toBe(400);

    expect(response.body).toBe("Név megadása szükséges");
  });

  test("2. should return 200 and new actor created in BD, when there is a name", async () => {
    //given

    const name = "XY";
    const description = "abc";
    const picture = "";
    await login(client);

    //when
    const response = await client.post("/api/actor").send({
      name,
      description,
    });
    console.log(typeof JSON.parse(response.text), JSON.parse(response.text));
    //then
    expect(response.status).toBe(200);
    const ActorLength = await Actor.count();
    expect(ActorLength).toBe(1);
    const actors = await Actor.find();

    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual(JSON.parse(response.text));
  });
  test("4. should return 401 no auth", async () => {
    //given

    const name = "XY";
    const description = "abc";
    const picture = "";

    //when
    const response = await client.post("/api/actor").send({
      name,
      description,
    });
    console.log(typeof JSON.parse(response.text), JSON.parse(response.text));
    //then
    expect(response.status).toBe(401);
    const ActorLength = await Actor.count();
    expect(ActorLength).toBe(0);
    const actors = await Actor.find();
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual(JSON.parse(response.text));
  });

  test("3. should return 200 and  actor updated in BD with new award", async () => {
    //given

    const name = "XY";
    const title = "Jászai Mari-díj";
    const year = 1974;
    await login(client);

    //when
    const response = await client.post("/api/actor/awards").send({
      name,
      title,
      year,
    });

    //then
    expect(response.status).toBe(200);
    const ActorLength = await Actor.count();
    expect(ActorLength).toBe(1);
    const actors = await Actor.find();
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual(JSON.parse(response.text));
  });
});
