
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('articles').del(),
    knex('publishers').del(),

    // Inserts seed entries
    knex('publishers').insert({id: 1, domain: 'theglobeandmail.com', name: 'The Globe and Mail', location: 'national', language: 'english'})
  );
};
