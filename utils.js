function dateToSQL(date) {
    let pad = function (num) {
        return ('00' + num).slice(-2);
    }
    let sql = date.getUTCFullYear() + '-' +
        pad(date.getUTCMonth() + 1) + '-' +
        pad(date.getUTCDate()) + ' ' +
        pad(date.getUTCHours()) + ':' +
        pad(date.getUTCMinutes());
    return sql;
  }

  module.exports=dateToSQL;