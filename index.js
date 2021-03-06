const app = require("./app");
const PORT = process.env.PORT || 3000;
const {
  createDataBase,
} = require(`${process.cwd()}/classes/dataBaseController`);

//--constants
const DATABASE_DIR =
  process.env.NODE_ENV === "test"
    ? `${process.cwd()}/database/url-data-test.json`
    : `${process.cwd()}/database/url-data.json`;
const DATA_TEMPLATE_DIR = `${process.cwd()}/classes/urlDataTemplate`;
const COMPARISON_KEY = "longUrl";

//-- process
startUpAndListen();

//-- accessory functions
async function startUpAndListen() {
  createDataBase(DATABASE_DIR, DATA_TEMPLATE_DIR, COMPARISON_KEY);
  const { dataBase } = require(`${process.cwd()}/classes/dataBaseController`);
  await dataBase.loadData();
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}


