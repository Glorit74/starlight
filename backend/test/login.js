require("dotenv").config();
const app = require("../app");
const mockserver = require("supertest");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { startDb, stopDb, deleteAll } = require("../utils/inMemoryDb");
const {
  setupGoogleSuccessResponse,
  setupGoogleErrorResponse,
} = require("../utils/httpMock");

describe("/api/user/login POST tests", () => {
  let connection;
  let mongod;
  let client;

  beforeAll(async () => {
    [connection, mongod] = await startDb();
    client = mockserver.agent(app);
  });

  afterEach(async () => {
    await deleteAll(User);
  });

  afterAll(async () => {
    await stopDb(connection, mongod);
  });

  test("1. should return 400, when code not sended, DB empty", async () => {
    //given

    const provider = "github";

    //when
    const response = await client.post("/api/user/login").send({
      provider,
    });

    //then
    expect(response.status).toBe(400);
  });

  test("2. should return 400, when provider not sended, DB empty", async () => {
    //given

    const code = "random1234";

    //when
    const response = await client.post("/api/user/login").send({
      code,
    });

    //then
    expect(response.status).toBe(400);
  });

  test("3. should return 400, when body not sended, DB empty, user not created", async () => {
    //given

    //when
    const response = await client.post("/api/user/login").send({});

    //then
    expect(response.status).toBe(400);
  });

  test("4. should return 400, when provider valid, but no code DB empty", async () => {
    //given
    const code = "random";
    const provider = "github";

    //when
    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });

    //then
    expect(response.status).toBe(400);
  });

  test("5. should return 400, when invalid code/provider sended", async () => {
    //given
    const code = "random";
    const provider = "random";

    //when
    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });

    //then
    expect(response.status).toBe(400);
    // const responseData = response.body;
    // expect(responseData.user.dashboards).toStrictEqual([]);
  });

  test("6. should return 200, when valid code/provider sended, user not created", async () => {
    //given
    const code = "random code from httpMock";
    const provider = "google";
    const userGoogleId = "123df1s31vdg5d1f3sf";
    setupGoogleSuccessResponse("1346dgr5ge");
    //when
    //nem csinálunk tényleges hívást
    const response = await client.post("/api/user/login").send({
      code,
      provider,
    });
    //then
    expect(response.status).toBe(200);
    const responseToken = jwt.decode(response.body);
    console.log("resp.body", response.body);
    // expect(responseToken.providers.google).toBe(userGoogleId);
    const users = await User.find();
    expect(users).toStrictEqual([]);
    // expect(users).toHaveLength(0);
  });

  test("7. should return 401, when invalid code sended", async () => {
    //given
    const code = "random";
    const provider = "google";
    setupGoogleErrorResponse();
    //when
    //nem csinálunk tényleges hívást
    const response = await client
      .post("/api/user/login")
      .send({ code, provider });

    //then
    expect(response.status).toBe(401);

    expect(response.body).toStrictEqual({});
    const users = await User.find();
    expect(users).toStrictEqual([]);
  });

  test("8. should return 401, when no authentication", async () => {
    //given
    const code = "random code from httpMock";
    const provider = "google";
    const userGoogleId = "123df1s31vdg5d1f3sf";
    setupGoogleSuccessResponse("1346dgr5ge");
    //when
    const response = await client
      .post("/api/user/login", auth({ block: true }))
      .send({ code, provider });

    //then
    expect(response.status).toBe(401);

    expect(response.body).toStrictEqual({});
  });
});
