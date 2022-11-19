//model for dashboard queries

import { QueryResult } from 'pg';
import Client from '../database';
import { Order } from '../models/order';
import { Product } from '../models/product';

export class dashboardQueries {
  
  //query shows all orders of selected user
  async orderByUser(
    user_id: number
  ): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const result: QueryResult<Order> = await conn.query(sql, [user_id]);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to find order by user ${user_id}: ${error}`);
    }
  }

  //query shows all Completed Orders by user 
  async completedOrderByUser(
    user_id: number
  ): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT * FROM orders WHERE user_id=($1) AND order_status=true';

      const result: QueryResult<Order> = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(
        `unable to find completed orders by user ${user_id}: ${error}`
      );
    }
  }

  //  query shows Products by category
  async productsByCategory(product_category: string): Promise<Product[]
  > {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE product_category=($1)';

      const result: QueryResult<Product> = await conn.query(sql, [product_category]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(
        `unable to find products by category ${product_category}: ${error}`
      );
    }
  }

  //- [OPTIONAL] Top 5 most popular products
  //shows top 5 products order by price
  async topFiveProducts(): Promise<Product[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT product_name, price FROM products ORDER BY price DESC LIMIT 5';

      const result: QueryResult<Product> = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get top 5 products: ${err}`);
    }
  }
}
