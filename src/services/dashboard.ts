//model for dashboard queries

import Client from '../database';

export class dashboardQueries {
  //query shows all orders of selected user
  async orderByUser(
    user_id: number
  ): Promise<{ id: number; user_id: number; order_status: boolean }[]> {
    try {
       
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to find order by user ${user_id}: ${error}`);
    }
  }

  //- [OPTIONAL] Completed Orders by user (args: user id)[token required]: '/completed-orders/:user-id' [GET]
  async completedOrderByUser(
    user_id: number
  ): Promise<{ id: number; user_id: number; order_status: boolean }[]> {
    try {
       
      const conn = await Client.connect();
      const sql =
        'SELECT * FROM orders WHERE user_id=($1) AND order_status=false';

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(
        `unable to find completed orders by user ${user_id}: ${error}`
      );
    }
  }

  //  - [OPTIONAL] Products by category (args: product category): '/product-by-category/:category' [GET]
  async productsByCategory(product_category: string): Promise<
    {id: number;
      product_name: string;
      price: number;
      product_category: string;
    }[]> 
    {
    try {

      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE product_category=($1)';

      const result = await conn.query(sql, [product_category]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(
        `unable to find products by category ${product_category}: ${error}`
      );
    }
  }

  //- [OPTIONAL] Top 5 most popular products:  '/top-5-products' [GET]

  async topFiveProducts(): Promise<
    {
      id: number;
      product_name: string;
      price: number;
      product_category: string;
    }[]
  > {
    try {
        
      const conn = await Client.connect();
      const sql =
        'SELECT product_name, price FROM products ORDER BY price DESC LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get top 5 products: ${err}`);
    }
  }
}
