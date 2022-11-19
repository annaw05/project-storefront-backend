import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../utils/verifyAuth';

const store = new ProductStore();

//Index route: '/products' [GET]
const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Show route: '/products/:id' [GET]
const show = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const product = await store.show(id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Create [token required]: '/products' [POST]
const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      product_name: req.body.product_name,
      price: req.body.price,
      product_category: req.body.product_category
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const product = await store.delete(id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productsRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.post('/products/:id', verifyAuthToken, deleteProduct);
  
};

export default productsRoutes;
