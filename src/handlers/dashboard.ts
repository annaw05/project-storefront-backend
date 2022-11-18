import express, { Request, Response } from 'express';
import { dashboardQueries } from '../services/dashboard';

const store = new dashboardQueries();

const productsByCategory = async (req: Request, res: Response) => {
  const product_category: string = req.body.product_category;
  const products = await store.productsByCategory(product_category);
  res.json(products);
};

const topFiveProducts = async (req: Request, res: Response) => {
  const products = await store.topFiveProducts();
  res.json(products);
};

const orderByUser = async (req: Request, res: Response) => {
  try {
    const user_id: number = parseInt(req.params.user_id);
    const orders = await store.orderByUser(user_id);
    res.json(orders);
  } catch (error) {
    res.send(400);
    res.json(error);
  }
};

const completedOrderByUser = async (req: Request, res: Response) => {
  const user_id: number = parseInt(req.params.user_id);
  const orders = await store.completedOrderByUser(user_id);
  res.json(orders);
};

const dashboardRoutes = (app: express.Application) => {
  app.get('/products-by-category/:category', productsByCategory);
  app.get('/top-5-products', topFiveProducts);
  app.get('/order-by-user/:user-id', orderByUser);
  app.get('/completed-orders/:user-id', completedOrderByUser);
};

export default dashboardRoutes;
