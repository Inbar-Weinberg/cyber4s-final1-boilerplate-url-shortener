const request = require("supertest");
const app = require(`../app`);
const fsPromises = require("fs/promises");

const DATABASE_DIR_TEST = `${process.cwd()}/database/url-data-test.json`;
const INITIAL_DB = JSON.stringify({ elements: [] });
/*beforeAll(async () => {
  console.log("seeding DB..");
  await fsPromises.writeFile(
    DATABASE_DIR_TEST,
    JSON.stringify(INITIAL_DB, null, 4)
  );
});

afterAll(async () => {
  console.log("removing DB..");
  await fsPromises.unlink(DATABASE_DIR_TEST);
});*/

describe("Testing: Create new short URL with Post request", () => {
  it("Adds a new Url object to data base", async () => {
    let response = await request(app)
      .post("/api/shorturl/new")
      .send({ url: "http://www.testurl.test" });

    expect(response.status).toBe(200);
  });
});
