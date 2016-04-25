exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', function(table) {
    table.increments();
    table.string('title')
      .notNullable();
    table.boolean('complete')
      .notNullable()
      .defaultTo(false) ;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos');
};
