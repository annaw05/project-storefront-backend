import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';

const store = new OrderStore();

describe('order model------ testing order model defined', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an close order Status method', () => {
    expect(store.closeOrderStatus).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('should have an addProduct method', () => {
    expect(store.addProduct).toBeDefined();
  });
});

describe('order model------ testing CRUD APIs of order model', () => {
  const userData = new UserStore();
  const productData = new ProductStore();

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

    //create product to test addProduct
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

    await productData.create(product1);
    await productData.create(product2);
  });

  const order123: Order = {
    user_id: 1,
    order_status: true
  };

  const order124: Order = {
    user_id: 2,
    order_status: true
  };

  it('creates order in db', async () => {
    const result1 = await store.create(order123);
    const result2 = await store.create(order124);
    expect(result1.user_id).toBe(1);
    expect(result2.user_id).toBe(2);
  });

  it('should return list of orders ----> index() method', async () => {
    const result = await store.index();
    expect(result.length).toEqual(2);
  });

  it('shows a specific order based on id ----> show() method', async () => {
    const result = await store.show(1);
    expect(result.user_id).toEqual(1);
  });

  it('updates status for order_id 1 to closed (false) ----> closeOrderStatus', async () => {
    const result = await store.closeOrderStatus(1);
    //console.log(result.order_status);
    expect(result.order_status).toBeFalsy();
  });

  it('adds product to an order ----> addProduct() method', async () => {
    const result = await store.addProduct(20, 1, 1);
    expect(result.id).toBe(1);
  });

  it('deletes order with id 1 ----> delete() method', async () => {
    const result = await store.delete(2);
    expect(result.id).toBe(2);
  });

  afterAll(async () => {
    await userData.cleanTableUsers();
    await productData.cleanTableProducts();
  });
});
