import { Order, OrderStore } from '../../models/order';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';
import { dashboardQueries } from '../../services/dashboard';

describe('testing dashboard queries', () => {
  const store = new dashboardQueries();
  const productData = new ProductStore();
  const orderData = new OrderStore();
  const userData = new UserStore();
  beforeAll(async () => {
    //create users to test create order
    const testuser1: User = {
      username: 'testUsername1',
      firstname: 'John',
      lastname: 'Doe',
      password: 'testpassword'
    };

    const testuser2: User = {
      username: 'testUsername2',
      firstname: 'Jane',
      lastname: 'Doe',
      password: 'testpassword2'
    };

    await userData.create(testuser1);
    await userData.create(testuser2);

    //create product
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

    //create orders
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
  });

  it('shows all orders of user 1 ----> orderByUser() method', async () => {
    const result = await store.orderByUser(1);
    expect(result.length).toBe(1);
  });

  it('shows all completed orders of user 2 ----> orderByUser() method', async () => {
    const result = await store.completedOrderByUser(2);
    expect(result[0].order_status).toBeFalse();
  });

  it('shows all products for given category ----> productsByCategory() method', async () => {
    const result = await store.productsByCategory('furniture');
    expect(result.length).toBe(2);
  });

  it('shows top 5 products ----> productsByCategory() method', async () => {
    const result = await store.topFiveProducts();
    expect(result[1].price).toBe(100);
  });

  afterAll(async () => {
    await userData.cleanTableUsers();
    await productData.cleanTableProducts();
    await orderData.cleanTableOrders();
  });
});
