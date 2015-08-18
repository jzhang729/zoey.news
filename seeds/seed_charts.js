
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('charts').del(),
    knex('tabs').del(),
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({email: 'brad@toomanybrads.com'}),
    knex('users').insert({email: 'thebrad@brad.com'}),
    knex('users').insert({email: 'bradley@bradcorp.com'}),
    knex('tabs').insert({user_id: 1, tab_list_order: 1, tab_name: "Election 2015"}),
    knex('tabs').insert({user_id: 1, tab_list_order: 2, tab_name: "Economy"}),
    knex('tabs').insert({user_id: 1, tab_list_order: 3, tab_name: "BC issues"}),
    knex('charts').insert({tab_id: 1, chart_list_order: 1, 
      chart_params: { title: "Party Leaders", chart_type: "snapshot", 
      keywords: ["Mulcair", "Trudeau", "Harper"], publishers: [1,2,3] }
    }),
    knex('charts').insert({tab_id: 1, chart_list_order: 2, 
      chart_params: { title: "Security", chart_type: "snapshot", 
      keywords: ["ISIS", "Terrorism", "RCMP"], publishers: [1,2,3] }
    }),
    knex('charts').insert({tab_id: 1, chart_list_order: 3, 
      chart_params: { title: "Duffy Scandal", chart_type: "timelapse", 
      keywords: ["Duffy", "Wright", "Senate"], publishers: [1,2,3] }
    }),
    knex('charts').insert({tab_id: 2, chart_list_order: 3, 
      chart_params: { title: "Economy", chart_type: "timelapse", 
      keywords: ["Taxes", "Economy", "Jobs"], publishers: [1,2,3] }
    })
  );
};
