//product model

import { QueryResult } from 'pg';
import Client from '../database';

export type Product = {
  id?: number;
  product_name: string;
  price: number;
  product_category: string;
};

export class ProductStore {
  //index method: shows all products
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';

      const result: QueryResult<Product> = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to get products: ${error}`);
    }
  }

  //show method: show product for given id
  async show(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';

      const result: QueryResult<Product> = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get product with ${id}: ${error}`);
    }
  }

  //create method: creates product
  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO products (product_name, price, product_category) VALUES ($1, $2, $3) RETURNING *';

      const result: QueryResult<Product> = await conn.query(sql, [
        p.product_name,
        p.price,
        p.product_category
      ]);
      const product = result.rows[0];
      conn.release();

      return product;
    } catch (error) {
      throw new Error(`unable to create product: ${error}`);
    }
  }

  //delete method: deletes product with given id
  async delete(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';

      const result: QueryResult<Product> = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (error) {
      throw new Error(`unable to delete product ${id}: ${error}`);
    }
  }

  //cleanTableProducts method: deletes data from the table -> used for testing
  async cleanTableProducts(): Promise<boolean> {
    try {
      const conn = await Client.connect();
      const sql = 'TRUNCATE products RESTART IDENTITY CASCADE';
      await conn.query(sql);

      conn.release();
      return true;
    } catch (error) {
      throw new Error('unable to delete data');
    }
  }
}
