var dbconfig = require('./knexfile')
var knex = require('knex')(dbconfig);

var queryDetail = function(k, p, callback) {
  
  var keywords = k.split(',')
  var publishers = p.split(',')
  var dates = ["2015-08-02","2015-08-03","2015-08-04","2015-08-05","2015-08-06","2015-08-07","2015-08-08","2015-08-09"]
  var sql = ""

  publishers.forEach(function(publisher, pi) {
    dates.forEach(function(date, di) {
      sql += "SELECT "
      + publisher + " as publisher_id, "
      + "'" + date + "' as date,"
      + " stat.* "
      + "FROM ts_stat('SELECT parsed_text FROM articles WHERE publication_date = ''" + date 
      + "'' AND publisher_id = " + publisher + "') stat"
      + " WHERE";
      keywords.forEach(function(keyword, ki) {
        sql += " to_tsvector(word) = (to_tsvector('" + keyword + "'))"
        if ((ki + 1) < keywords.length) {
          sql += " OR";
        }
      });
      if ( ((di + 1) < dates.length) || ((pi + 1) < publishers.length) ) {
        sql += " UNION ";
      }
    });
  });
  sql += "ORDER BY date;"

  knex.raw(sql).then(callback);
}

var getPublisherList = function(callback) {
  knex.select().from("publishers").then(callback)
}

var getTopKeywords = function(d, p, callback) {
  // TODO: return top ten(?) keywords for a given set of publishers and date range
}


exports.queryDetail = queryDetail;
exports.getPublisherList = getPublisherList;

