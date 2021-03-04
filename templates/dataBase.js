const urlDataTemplate=require('./urlDataTemplate')
class dataBase {
  constructor() {
    this.urls = [];
  }
  findUrl(url) {
    return this.urls.find((element) => element.longUrl === url);
  }
  findIndexUrl(url) {
    return this.urls.findIndex((element) => element.longUrl === url);
  }

  addUrl(url) {
    if (!this.findUrl(url)) {
      let urlObj = new urlDataTemplate(url);
      this.urls.push(url);
      return true;
    }
    return false;
  }

  removeUrl(url) {
    let index = this.findIndexUrl(url);
    if (index >= 0) {
      this.urls.splice(index, 1);
      return true;
    }
    return false;
  }
}
module.exports = dataBase;
