 //@ts-ignore: ignore type Client
import Client from '../database';
import {Pool, PoolClient } from 'pg';
import bcrypt from 'bcrypt';

const pepper: string = process.env.BCRYPT_PASSWORD as string;
const saltRounds: string = process.env.SALT_ROUNDS as string;

export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  // - Index [token required]: '/users' [GET]
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to get users: ${error}`);
    }
  }
  // - Show [token required]: 'users/:id' [GET]
  async show(id: number): Promise<User> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get user with ${id}: ${error}`);
    }
  }
  // - Create N[token required]: '/users' [POST]
  async create(u: User): Promise<User> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql =
        'INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

      const result = await conn.query(sql, [
        u.username,
        u.firstname,
        u.lastname,
        hash
      ]);
      const user = result.rows[0];
      conn.release();

      return user;
    } catch (error) {
      throw new Error(`unable to create user: ${error}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User> {
    const conn: PoolClient = await Client.connect();
    const sql = 'SELECT password FROM users WHERE username=($1)';

    const result = await conn.query(sql, [username]);
    conn.release();
    
    console.log(password + pepper);

    // checking if user found with username given
    if (result.rows.length) {
      const user: User = result.rows[0];
      console.log(user);

      // checking if password matches
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      } else {
        throw new Error('password invalid');
      }
    } else {
      throw new Error(`user ${username} not found`);
    }
  }

  //method to delete all data inside users table
  async cleanTableUsers(): Promise<boolean> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = 'TRUNCATE users RESTART IDENTITY CASCADE';
      await conn.query(sql);
      
      conn.release();
      return true;
    } catch (error) {
      throw new Error('unable to delete data') ;
    }
  }
}
