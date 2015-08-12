var request = require('request');
var cheerio = require('cheerio');
var events = require('events');
var dbconfig = require('./knexfile');
var knex = require('knex')(dbconfig);

var feedlyurl = "http://feedly.com/v3/streams/contents?streamId=feed/http://news.nationalpost.com/category/news/canada/canadian-politics/feed&count=200"

var getContents = function(items) {
  items.forEach(function(article) {
    var url = article["originId"];
    var publisher_id = 2;
    var date = new Date(article["published"]).toDateString();
    var title = article["title"];
    var $ = cheerio.load(article["content"]["content"]);
    var full_text = $('p').map(function() {
      return $.text([this]);
    }).get().join(" ");
    addToDatabase(url, publisher_id, date, title, full_text);
  });
  setTimeout(process.exit, 3000);
};


var addToDatabase = function(url, publisher_id, date, title, full_text) {
  knex('articles').returning('id').insert({
                           url: url,
                           publisher_id: publisher_id,
                           publication_date: date,
                           title: title,
                           full_text: full_text
                         })
                         .then(function(id){
                           knex.transaction(function(trx) {
                             knex.raw('UPDATE articles SET parsed_text = (SELECT to_tsvector(full_text)) WHERE id = ?', id)
                             .then(trx.commit);
                           });
                         });
};

request(feedlyurl, function (error, response, body) {
  if (error) {
    console.log(error);
  };
  if (!error && response.statusCode == 200) {
    var items = JSON.parse(body)["items"];
    getContents(items);
  };
});
