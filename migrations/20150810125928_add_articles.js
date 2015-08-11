
exports.up = function(knex, Promise) {
  return knex.schema.
    createTable('publishers', function(table) {
      table.increments('id');
      table.string('domain').notNullable().unique();
      table.string('name');
      table.string('location');
      table.string('language');
    }).
    createTable('articles', function (table) {
      table.increments('id').primary();
      table.string('url').notNullable().unique();
      table.integer('publisher_id').notNullable().references('id').inTable('publishers');
      table.date('publication_date').notNullable();
      table.string('title');
      table.text('full_text').notNullable();
      table.specificType('parsed_text', 'tsvector');
      table.integer('word_count');
      table.timestamps();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles').dropTable('publishers');
};
