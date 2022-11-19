import express, { Request, Response } from 'express';
import { dashboardQueries } from '../services/dashboard';
import verifyAuthToken from '../utils/verifyAuth';

const store = new dashboardQueries();

//[OPTIONAL] Products by category (args: product category): '/products-by-category/:category' [GET]
const productsByCategory = async (req: Request, res: Response) => {
  try {
    const product_category: string = req.body.product_category;
    const products = await store.productsByCategory(product_category);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//[OPTIONAL] Top 5 most popular products:  '/top-5-products' [GET]
const topFiveProducts = async (req: Request, res: Response) => {
  try {
    const products = await store.topFiveProducts();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//- Current Order by user (args: user id)[token required]: '/order-by-user/:user-id' [GET]
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

//- [OPTIONAL] Completed Orders by user (args: user id)[token required]: '/completed-orders/:user-id' [GET]
const completedOrderByUser = async (req: Request, res: Response) => {
  try {
    const user_id: number = parseInt(req.params.user_id);
    const orders = await store.completedOrderByUser(user_id);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const dashboardRoutes = (app: express.Application) => {
  app.get('/products-by-category/:category', productsByCategory);
  app.get('/top-5-products', topFiveProducts);
  app.get('/orders-by-user/:user_id', orderByUser);
  app.get('/completed-orders/:user_id', verifyAuthToken, completedOrderByUser);
};

export default dashboardRoutes;
