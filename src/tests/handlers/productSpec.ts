import app from '../../server';
import supertest from 'supertest';
import { ProductStore, Product } from '../../models/product';
import { User } from '../../models/user';

const request = supertest(app);

/*
- Index route: '/products' [GET]
- Show route: '/products/:id' [GET]
- Create [token required]: '/products' [POST]
*/

const store = new ProductStore();
let token: string;
describe('------ testing product endpoints ------', () => {
  const product1: Product = {
    product_name: 'sofa',
    price: 1000,
    product_category: 'furniture'
  };

  const testuser2: User = {
    id: 2,
    username: 'testUsername2',
    firstname: 'Jane',
    lastname: 'Doe',
    password: 'testpassword2'
  };

  //post user to get token from response body to use in tests
  beforeAll(async () => {
    const userRequest = await request
      .post('/users')
      .send(testuser2)
      // to get response in JSON
      .set('Accept', 'application/json');

    token = userRequest.body;
  });

  it('CREATE endpoint: /products [POST] ', async () => {
    const response = await request
      .post('/users')
      .send(product1)
      .set(`authorization`, `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('INDEX endpoint: /products [GET]', async () => {
    const response = await request
      .get('/products')
      .set(`authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('SHOW endpoint: /products/:id [GET]', async () => {
    const response = await request
      .get('/products/2')
      .set(`authorization`, `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await store.cleanTableProducts();
  });
});
