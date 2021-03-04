const supertest = require("supertest");
const app = require(`${process.cwd()}/app`);
const request = supertest(app);


const URL_DATABASE_DIR = `${process.cwd()}/database/url-data-test.json`;

describe("Test GET functionality", () => {
    it(('test'),()=>{
        expect(1+2).toBe(3);
    })
});
