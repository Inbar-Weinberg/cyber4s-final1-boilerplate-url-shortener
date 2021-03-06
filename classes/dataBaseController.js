const fsPromises = require("fs/promises");

module.exports.createDataBase = createDataBase;


//let dataBase;

function createDataBase(dataDirectory, dataTemplateDirectory, comparisonKey) {
  module.exports.dataBase = new dataBaseController(
    dataDirectory,
    dataTemplateDirectory,
    comparisonKey,
  );
 // return dataBase;
}



class dataBaseController {
  constructor(dataDirectory, dataTemplateDirectory, comparisonKey) {
    this.dataDirectory = dataDirectory;
    this.dataTemplate = require(dataTemplateDirectory);
    this.comparisonKey = comparisonKey;
    this.dataArr = undefined;
  }

  async loadData() {
    this.dataArr = JSON.parse(
      await fsPromises.readFile(this.dataDirectory)
    ).elements;
  }
  async uploadData() {
    await fsPromises.writeFile(
      this.dataDirectory,
      JSON.stringify({ elements: this.dataArr }, null, 4)
    );
  }
  shutDown() {
    this.dataArr = [];
  }

  isLoaded() {
    return this.dataArr instanceof Array;
  }

  addElement(elementTitle, key = this.comparisonKey) {
    let found = findElementByKey.call(this, elementTitle, key);
    if (!found) {
      const newDataObj = new this.dataTemplate(elementTitle);
      this.dataArr.push(newDataObj);
      return { newDataObj, success: true };
    }
    return false;
  }

  removeElement(elementTitle, key = this.comparisonKey) {
    const index = findElementIndexByKey.call(this, elementTitle, key);
    if (index >= 0) {
      this.dataArr.splice(index, 1);
      return true;
    }
    return false;
  }

  getElement(elementTitle, key = this.comparisonKey) {
    let index = findElementIndexByKey.call(this, elementTitle, key);
    if (index >= 0) return this.dataArr[index];
    else return undefined;
  }
  getAllElements() {
    return this.dataArr;
  }

  updateCounter(elementTitle, count = 1) {
    let index = findElementIndexByKey.call(this, elementTitle, key);
    if (index >= 0) {
      return ++this.dataArr[index].counter;
    }
  }
}

function findElementByKey(elementTitle, key) {
  return this.dataArr.find((element) => element[key] === elementTitle);
}

function findElementIndexByKey(elementTitle, key) {
  return this.dataArr.findIndex((element) => element[key] === elementTitle);
}

// module.exports = dataBaseController;
