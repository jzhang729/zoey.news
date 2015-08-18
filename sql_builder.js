var dbconfig = require('./knexfile')
var knex = require('knex')(dbconfig);
var makeDates = require('./makeDates').makeDates
var escapeString = require('./escapeString').escapeString

var queryDetail = function(k, p, callback) {

  var keywords = escapeString(k).split(',')
  var publishers = escapeString(p).split(',')
  var dates = makeDates()
  var sql = ""

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

  knex.raw(sql).then(callback)
}

var getPublisherList = function(callback) {
  knex.select().from("publishers").then(callback)
}

// This function doesn't work yet because 
// I can't figure out how to make async database
// calls for all the chart data while mapping over 
// the array of chart metadata... Knex only works
// asynchronously

// var getCharts = function(user, callback) {
//   knex.select('charts.id', 'charts.chart_list_order', 'charts.chart_params', 'charts.tab_id', 'tabs.tab_list_order', 'tabs.tab_name')
//     .from("charts")
//     .leftJoin('tabs', 'charts.tab_id', 'tabs.id')
//     .where('tabs.user_id', user)
//     .then(function(charts) {
//       callback(charts.map(function(chart) {
//         var newChart = chart
//         getChartData(newChart.chart_params, function(rows) {
//           newChart.data = rows;
//         });
//         return newChart
//       }));
//     });
// }

var getCharts = function(user, callback) {
  knex.select('charts.id', 'charts.chart_list_order', 'charts.chart_params', 'charts.tab_id', 'tabs.tab_list_order', 'tabs.tab_name')
    .from("charts")
    .leftJoin('tabs', 'charts.tab_id', 'tabs.id')
    .where('tabs.user_id', user)
    .then(callback);
}


var getChartData = function(chartParams, callback) {
  console.log("getChartData")
  var keywords = chartParams.keywords.toString()
  var publishers = chartParams.publishers.toString()
  queryDetail(keywords, publishers, function(resp) {
    callback(resp.rows);
  })
}

var getChart = function(chartID, callback) {
  knex.select('chart_params')
    .from('charts')
    .where('charts.id', chartID)
    .then(function(rows) {
      callback(rows[0].chart_params)
    });
}

exports.queryDetail = queryDetail;
exports.getPublisherList = getPublisherList;
exports.getCharts = getCharts;
exports.getChart = getChart;
exports.getChartData = getChartData;
