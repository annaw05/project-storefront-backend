import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('----------------- model: product -------------------', ()=>{
  describe('product model defined', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
  
    it('should have an create method', () => {
      expect(store.create).toBeDefined();
    });
  
    it('should have an show method', () => {
      expect(store.show).toBeDefined();
    });
  
    it('should have a delete method', () => {
      expect(store.delete).toBeDefined();
    });
  });
  
  describe('CRUD APIs working', () => {
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
  
    it('creates product in db', async () => {
      const result1 = await store.create(product1);
      const result2 = await store.create(product2);
      expect(result1.product_name).toBe('sofa');
      expect(result2.product_name).toBe('picture');
    });
  
    it('should return list of products ----> index method', async () => {
      const result = await store.index();
      expect(result.length).toEqual(2);
    });
  
    it('shows a specific product based on id ----> show method', async () => {
      const result = await store.show(1);
      expect(result.product_name).toEqual('sofa');
    });
  
    it('deletes product with id 1 ----> delete() method', async () => {
      const result = await store.delete(1);
      expect(result.id).toBe(1);
    });
  
    afterAll(async () => {
      store.cleanTableProducts();
    });
  });
  
})

