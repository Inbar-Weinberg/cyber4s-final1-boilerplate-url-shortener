const request = require("supertest");
const app = require(`./app.js`);
const fsPromises = require("fs/promises");
const { validateUrl } = require("./utils");

const { createDataBase } = require("./classes/dataBaseController");
let dataBase = {};
const testUrl = "https://testingIsFun.com";

//--
const DATABASE_DIR = `database/url-data-test.json`;
const DATA_TEMPLATE_DIR = "./urlDataTemplate.js";
const COMPARISON_KEY = "longUrl";

beforeAll(async () => {
  const emptyDataBase = JSON.stringify({
    elements: [],
  });
  await fsPromises.writeFile(DATABASE_DIR, emptyDataBase);
  createDataBase(DATABASE_DIR, DATA_TEMPLATE_DIR, "longUrl");
  dataBase = require(`${process.cwd()}/classes/dataBaseController`).dataBase;
  await dataBase.loadData();
  dataBase.addElement("google.com", "longUrl");
  dataBase.addElement("google2.com", "longUrl");
  await dataBase.uploadData();
  console.log(dataBase);
});

afterAll(async () => {
  console.log("removing DB..");
  await fsPromises.unlink(DATABASE_DIR);
  dataBase.shutDown();
  dataBase = null;
});
//--

describe("Starting testing post:", () => {
  it("Should add new Url object to data base", async () => {
    let response = await request(app)
      .post("/api/shorturl/new")
      .type("form")
      .send({ url: "http://www.me.com" });
    expect(dataBase.dataArr.length).toBe(3);
    expect(response.status).toBe(302);
  });
});
