exports.up = function(knex, Promise) {
  return knex.schema.
    createTable('users', function (table) {
      table.increments('id').primary();
      table.string('email').notNullable().unique(); // This should be adjusted to include lowercase attribute
      table.string('password');
      table.string('facebook');
      table.string('twitter');
      table.string('google');
      table.string('github');
      table.string('instagram');
      table.string('tokens'); // This should be converted to an array
      table.json('profile').nullable();
      table.string('resetPasswordToken');
      table.date('resetPasswordExpires').nullable();
      table.timestamps();
    }).
    createTable('tabs', function (table) {
      table.increments('id').primary();
      table.integer('user_id').notNullable() // .references('id').inTable('users');
      table.integer('tab_list_order')  //.notNullable();   
      table.string('tab_name');
      table.timestamps();
    }).
    createTable('charts', function (table) {
      table.increments('id').primary();
      table.integer('tab_id').notNullable() // .references('id').inTable('tabs');
      table.integer('chart_list_order') //.notNullable(); 
      table.string('chart_type');
      table.string('chart_title');
      table.string('keywords');
      table.string('publishers');

      table.timestamps();
    });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('charts').dropTable('tabs').dropTable('users');
};
