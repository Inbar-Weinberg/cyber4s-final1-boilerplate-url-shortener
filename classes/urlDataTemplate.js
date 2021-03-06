const shortid = require("shortid");
const {dateToSQL} = require("../utils");

class urlDataTemplate {
  constructor(url) {
    this.longUrl = url;
    this.shortUrl = shortid.generate();
    this.clickCount = 0;
    this.dateCreated = dateToSQL(new Date());
  }
}

module.exports = urlDataTemplate;
