var dbconfig = require('./knexfile');
var knex = require('knex')(dbconfig);

knex.transaction(function(trx) {
  knex.raw('UPDATE articles SET parsed_text = (SELECT to_tsvector(full_text))')
  .then(trx.commit);
});
setTimeout(process.exit, 3000);
