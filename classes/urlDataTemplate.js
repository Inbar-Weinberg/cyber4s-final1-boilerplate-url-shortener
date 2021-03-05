const shortid = require("shortid");
class urlDataTemplate {
  constructor(url) {
    this.longUrl = url;
    this.shortUrl = shortid.generate();
    this.clickCount = 0;
    this.dateCreated = new Date();
  }
};

module.exports =  urlDataTemplate;
