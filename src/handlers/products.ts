import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../utils/verifyAuth';

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
  };

  const show = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const product = await store.show(id);
    res.json(product);
  };

  const create = async (req: Request, res: Response) => {
    try {
      const product: Product = {
        product_name: req.body.product_name,
        price: req.body.price,
        product_category: req.body.product_category,
      };
  
      const newProduct = await store.create(product);
      res.json(newProduct);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  };

  const deleteProduct = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const product = await store.delete(id);
    res.json(product);
  };
/*
  const productsByCategory = async (req: Request, res: Response) => {
    const product_category: string = req.body.product_category;
    const products = await store.productsByCategory(product_category);
    res.json(products);
  };
*/
/*
  const topFiveProducts = async (req: Request, res: Response) => {
    const products = await store.topFiveProducts();
    res.json(products);
  };
*/
  const ordersRoutes = (app: express.Application) => {
    app.get('/products', index),
    app.get('/products/:id', show),
    app.post('/products',verifyAuthToken, create),
    app.post('/products/:id',verifyAuthToken, deleteProduct)
    //app.get('/products/:category', productsByCategory)
    //app.get('/top-5-products', topFiveProducts)
  };

  export default ordersRoutes;