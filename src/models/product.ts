//product model
 //@ts-ignore: ignore type Client
import Client from '../database';

export type Product = {
  id?: number;
  product_name: string;
  price: number;
  product_category: string;
};

export class ProductStore {
  /* - Index route: '/products' [GET]*/
  async index(): Promise<Product[]> {
    try {
       //@ts-ignore: ignore type Client
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to get products: ${error}`);
    }
  }

  /**- Show route: '/products/:id' [GET] */
  async show(id: number): Promise<Product> {
    try {
       //@ts-ignore: ignore type Client
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get product with ${id}: ${error}`);
    }
  }

  /*- Create [token required]: '/products' [POST]*/
  async create(p: Product): Promise<Product> {
    try {
       //@ts-ignore: ignore type Client
      const conn = await Client.connect();
      const sql =
        'INSERT INTO products (product_name, price, product_category) VALUES ($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [
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

  async delete(id: number): Promise<Product> {
    try {
       //@ts-ignore: ignore type Client
      const conn = await Client.connect();
      const sql = 'DELETE FROM products WHERE id=($1)';

      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (error) {
      throw new Error(`unable to delete product ${id}: ${error}`);
    }
  }

  /*
  //  - [OPTIONAL] Products by category (args: product category): '/product-by-category/:category' [GET]
  async productsByCategory(product_category: string): Promise<Product[]> {
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
*/

  /*
  //- [OPTIONAL] Top 5 most popular products:  '/top-5-products' [GET]
  // -> Services -> Dashboard????
  // async topExpensiveProducts (): Promise<{name: string, price: number}[]> {

  async topFiveProducts(): Promise<Product[]> {
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
  */
}
