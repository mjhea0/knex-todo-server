var knex = require('./knex.js');

function Todos() {
  return knex('todos');
}

// *** queries *** //

function getAll() {
  return Todos().select();
}

function getSingle(todoID) {
  return Todos().where('id', parseInt(todoID)).first();
}

function add(todo) {
  return Todos().insert(todo, 'id');
}

function update(todoID, updates) {
  return Todos().where('id', parseInt(todoID)).update(updates);
}

function deleteItem(todoID) {
  return Todos().where('id', parseInt(todoID)).del();
}


module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  add: add,
  update: update,
  deleteItem: deleteItem
};