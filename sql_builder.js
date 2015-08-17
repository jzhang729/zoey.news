var dbconfig = require('./knexfile')
var knex = require('knex')(dbconfig);
var makeDates = require('./makeDates').makeDates
var escapeString = require('./escapeString').escapeString

var queryDetail = function(k, p, callback) {

  var keywords = escapeString(k).split(',')
  var publishers = escapeString(p).split(',')
  var dates = makeDates()
  var sql = ""

  var params = []

  publishers.forEach(function(publisher, pi) {
    dates.forEach(function(date, di) {
      keywords.forEach(function(keyword, ki) {
        sql += "SELECT "
        + "'"+keyword+"'" + " AS word, "
        + publisher + " AS publisher_id, "
        + "'" + date + "' AS date,"
        + " stat.word AS lexeme, stat.ndoc, stat.nentry "
        + "FROM ts_stat('SELECT parsed_text FROM articles WHERE publication_date = ''" + date
        + "'' AND publisher_id = " + publisher + "') stat"
        + " WHERE"
        + " to_tsvector(word) = (to_tsvector('" + keyword + "'))"
        if ( ((di + 1) < dates.length) || ((pi + 1) < publishers.length) || ((ki + 1) < keywords.length) ) {
          sql += " UNION ";
        }
      });
    });
  });
  sql += "ORDER BY date;"

  knex.raw(sql, params).then(callback);
}

var getPublisherList = function(callback) {
  knex.select().from("publishers").then(callback)
}

var getTopKeywords = function(d, p, callback) {
  // TODO: return top ten(?) keywords for a given set of publishers and date range
}


exports.queryDetail = queryDetail;
exports.getPublisherList = getPublisherList;
