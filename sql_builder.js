var dbconfig = require('./knexfile')
var knex = require('knex')(dbconfig);

var queryDetail = function(k, p, d, callback) {
  
  var keywords = k.split(',')
  var publishers = p.split(',')
  var dates = d.split(',')
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

exports.queryDetail = queryDetail;


// SELECT
//   1 as publisher_id,
//   '2015-08-10' as date,
//   stat.*
// FROM ts_stat('SELECT parsed_text FROM articles WHERE publication_date = ''2015-08-10'' AND publisher_id = 1') stat
// WHERE to_tsvector(word) = (to_tsvector('terrorism')) OR to_tsvector(word) = (to_tsvector('Mulcair'))
// UNION
// SELECT
//   1 as publisher_id,
//   '2015-08-02' as date,
//   stat.*
// FROM ts_stat('SELECT parsed_text FROM articles WHERE publication_date = ''2015-08-02'' AND publisher_id = 1') stat
// WHERE to_tsvector(word) = (to_tsvector('terrorism')) OR to_tsvector(word) = (to_tsvector('Mulcair'))
// UNION
// SELECT
//   2 as publisher_id,
//   '2015-08-10' as date,
//   stat.*
// FROM ts_stat('SELECT parsed_text FROM articles WHERE publication_date = ''2015-08-10'' AND publisher_id = 2') stat
// WHERE to_tsvector(word) = (to_tsvector('terrorism')) OR to_tsvector(word) = (to_tsvector('Mulcair'))
// UNION
// SELECT
//   2 as publisher_id,
//   '2015-08-02' as date,
//   stat.*
// FROM ts_stat('SELECT parsed_text FROM articles WHERE publication_date = ''2015-08-02'' AND publisher_id = 2') stat
// WHERE to_tsvector(word) = (to_tsvector('terrorism')) OR to_tsvector(word) = (to_tsvector('Mulcair'));
