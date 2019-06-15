const db = require('../data/dbConfig.js');

module.exports = {
   get,
   getById,
   getBy,
   add,
};

function get() {
   return db('users').select('id', 'username', 'password', 'department');
}

function getById(id) {
   return db('users').where({ id }).first();
}

function getBy(filter) {
   return db('users').where(filter).first();
}

async function add(user) {
   const [id] = await db('users').insert(user);

   return getById(id);
}