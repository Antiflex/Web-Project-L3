import pkg from './knexfile.cjs';
const development = pkg.development
import knex from 'knex';

const configuredKnex = knex(development)

export default configuredKnex;