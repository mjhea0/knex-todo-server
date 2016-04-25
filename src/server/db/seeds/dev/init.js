exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('todos').del(),
    // Inserts seed entries
    knex('todos').insert({
      title: 'Finish reading that one book',
    })
    .then(function(response) {
      return knex('todos').insert({
        title: 'Pay rent on time'
      });
    })
  );
};
