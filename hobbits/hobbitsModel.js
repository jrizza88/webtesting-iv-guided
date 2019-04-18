// this is more of specific functions and methods for specific sources 
// this is compared to the dbConfig.js file

// testing would require both files

const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(hobbit) {
  const [id] = await db('hobbits').insert(hobbit);

  return db('hobbits')
  .where({ id })
  .first();
}

async function update(id, changes) {

 await db('hobbits').where({ id }).update(changes)
  return db('hobbits').where({ id }).first()
}

function remove(id) {
  return null;
}

function getAll() {
  return db('hobbits');
}

function findById(id) {
  return db('hobbits')
    .where({ id })
    .first();
}
