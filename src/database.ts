// file provides the information that our application needs in order to connect to a Postgres database
//
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV
} = process.env;

console.log(ENV);

//const database = ENV ==='test'? POSTGRES_DB_TEST: POSTGRES_DB; 
//console.log('database '+ database);

const client: Pool = new Pool({
  host: POSTGRES_HOST,
  database: ENV ==='test'? POSTGRES_DB_TEST: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
});


export default client;
