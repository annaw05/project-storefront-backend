import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.POSTGRES_HOST,
  dbDev: process.env.POSTGRES_DB,
  dbTest: process.env.POSTGRES_TEST_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  env: process.env.ENV,
  bcryptPassword: process.env.BCRYPT_PASSWORD,
  saltRound: process.env.SALT_ROUNDS,
  tokenSecret: process.env.TOKEN_SECRET
};

export default config;
