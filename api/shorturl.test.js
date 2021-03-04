const supertest = require("supertest");
const app = require(`${process.cwd()}/app`);
const request = supertest(app);
const fsPromises = require("fs/promises");


const URL_DATABASE_DIR = `${process.cwd()}/database/Hello.json`;
const INITIAL_DB = JSON.stringify({ urls: [] });
beforeAll(async() => {
    console.log("seeding DB..");
    await fsPromises.writeFile(
        URL_DATABASE_DIR,
        JSON.stringify(INITIAL_DB, null, 4)
      ); 
  });
  afterAll(async () => {
    console.log("removing DB..");
    await fsPromises.unlink(URL_DATABASE_DIR);
  });


describe("Test create new short URL with Post request", () => {
  it("test", () => {
    expect(1 + 2).toBe(3);
  });
});
