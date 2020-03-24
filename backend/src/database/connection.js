const knex = require('knex');
const configuration = require('../../knexfile');

//escolhe a conexao
const connection = knex(configuration.development);

module.exports = connection;