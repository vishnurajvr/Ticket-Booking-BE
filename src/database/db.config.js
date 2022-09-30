require('dotenv').config();
const Knex = require('knex');
const { Model } = require('objection');

const knexFile = require('../../knexfile');

const knex = Knex(knexFile[process.env.NODE_ENV]);

// Setup Knex with Objection ORM
Model.knex(knex);

module.exports = knex;