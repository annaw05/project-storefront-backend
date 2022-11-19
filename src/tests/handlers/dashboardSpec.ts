import app from '../../server';
import supertest from 'supertest';
import { OrderStore, Order } from '../../models/order';
import { UserStore, User } from '../../models/user';
import { ProductStore, Product } from '../../models/product';


const request = supertest(app);

/*
#### Orders
- Current Order by user (args: user id)[token required]: '/order-by-user/:user-id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: '/completed-orders/:user-id' [GET]
- [OPTIONAL] Top 5 most popular products:  '/top-5-products' [GET]
- [OPTIONAL] Products by category (args: product category): '/products-by-category/:category' [GET]
*/

describe('-----------------endpoints: dashboard queries -------------------', () => {
  const userData = new UserStore();
  const orderData = new OrderStore();
  const productData = new ProductStore();

  let token: string;

  beforeAll(async () => {
    //create users to test order by user
    const testuser1: User = {
      id: 1,
      username: 'testUsername1',
      firstname: 'John',
      lastname: 'Doe',
      password: 'testpassword'
    };

    const testuser2: User = {
      id: 2,
      username: 'testUsername2',
      firstname: 'Jane',
      lastname: 'Doe',
      password: 'testpassword2'
    };

    await userData.create(testuser1);
    await userData.create(testuser2);

    const order123: Order = {
      user_id: 1,
      order_status: true
    };

    const order124: Order = {
      user_id: 2,
      order_status: false
    };

    await orderData.create(order123);
    await orderData.create(order124);

    const product1: Product = {
      product_name: 'sofa',
      price: 1000,
      product_category: 'furniture'
    };

    const product2: Product = {
      product_name: 'picture',
      price: 50,
      product_category: 'decoration'
    };

    const product3: Product = {
      product_name: 'table',
      price: 100,
      product_category: 'furniture'
    };

    await productData.create(product1);
    await productData.create(product2);
    await productData.create(product3);

    const userRequest = await request
      .post('/users')
      .send(testuser2)
      // to get response in JSON
      .set('Accept', 'application/json');

    token = userRequest.body;
  });

  it('ORDER by USER endpoint: /order-by-user/:user_id [GET] ', async () => {
    const response = await request.get('/orders-by-user/1');
    expect(response.status).toBe(200);
  });

  it('COMPLETED ORDER BY USER endpoint: /completed-orders/:user_id [GET] ', async () => {
    const response = await request
      .get('/completed-orders/2')
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('TOP 5 PRODUCTS endpoint: /top-5-products [GET] ', async () => {
    const response = await request.get('/top-5-products');
    expect(response.status).toBe(200);
  });

  it('PRODUCT BY CATEGORY endpoint: /top-5-products [GET] ', async () => {
    const response = await request.get('/products-by-category/furniture');
    expect(response.status).toBe(200);
  });

  it('COMPLETED ORDER BY USER endpoint sends 401 unauthorized: /completed-orders/:user_id [GET] ', async () => {
    token = token + 'ghda';
    const response = await request
      .get('/completed-orders/1')
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.status).toBe(401);
  });

  afterAll(async () => {
    await userData.cleanTableUsers();
    await orderData.cleanTableOrders();
  });
});
