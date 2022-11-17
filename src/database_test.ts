import { Pool } from 'pg';
import config from './config';

const client = new Pool({
  host: config.host,
  database: config.dbDev,
  user: config.user,
  password: config.password
});

export default client;
