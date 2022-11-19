import { QueryResult } from 'pg';
import Client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  order_status: boolean;
};

export class OrderStore {
  //index method: shows all orders
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';

      const result: QueryResult<Order> = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to get orders: ${error}`);
    }
  }

  //show method: show order for given id
  async show(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';

      const result: QueryResult<Order> = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get order with ${id}: ${error}`);
    }
  }

  //create method: create order with user-id that created that order and order status
  async create(o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders (user_id, order_status) VALUES ($1, $2) RETURNING *';

      const result: QueryResult<Order> = await conn.query(sql, [
        o.user_id,
        o.order_status
      ]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (error) {
      throw new Error(`unable to create order: ${error}`);
    }
  }

  //closeOrderStatus method: set order status to closed (=true)
  async closeOrderStatus(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE orders SET order_status=true WHERE id=($1) RETURNING *';

      const result: QueryResult<Order> = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (error) {
      throw new Error(`unable to close order status: ${error}`);
    }
  }

  //delete method: deletes specific order for given id
  async delete(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';

      const result: QueryResult<Order> = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (error) {
      throw new Error(`unable to delete order: ${error}`);
    }
  }

  // addProduct method: adds product to an order
  async addProduct(
    quantity: number,
    order_id: number,
    product_id: number
  ): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';

      const result: QueryResult<Order> = await conn.query(sql, [
        quantity,
        order_id,
        product_id
      ]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (error) {
      throw new Error(
        `unable to add product ${product_id} to the order ${order_id}: ${error}`
      );
    }
  }

  //cleanTableOrder methods: deletes all data in table -> used in testing
  async cleanTableOrders(): Promise<boolean> {
    try {
      const conn = await Client.connect();
      const sql = 'TRUNCATE orders RESTART IDENTITY CASCADE';
      await conn.query(sql);

      conn.release();
      return true;
    } catch (error) {
      throw new Error('unable to delete data');
    }
  }
}
