var dbconfig = require('./knexfile')
var knex = require('knex')(dbconfig);

var escape_string = function (str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
    case "\0":
      return "\\0";
    case "\x08":
      return "\\b";
    case "\x09":
      return "\\t";
    case "\x1a":
      return "\\z";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "\"":
    case "'":
    case "\\":
    case "%":
      return "\\"+char; // prepends a backslash to backslash, percent,
                          // and double/single quotes
    }
  });
}


var queryDetail = function(k, p, callback) {
  
  var keywords = escape_string(k).split(',')
  var publishers = escape_string(p).split(',')
  var dates = ["2015-08-02","2015-08-03","2015-08-04","2015-08-05","2015-08-06","2015-08-07","2015-08-08","2015-08-09"]
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

