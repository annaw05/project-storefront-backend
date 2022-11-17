import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const order = await store.show(id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      //order_status is false when order is open
      //order_status: is order closed?
      order_status: false
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const closeOrderStatus = async (req: Request, res: Response) => {
  const newOrderStatus = await store.closeOrderStatus;
  res.json(newOrderStatus);
};

const deleteOrder = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const order = await store.delete(id);
  res.json(order);
};
/*
const orderByUser = async (req: Request, res: Response) => {
    const user_id: number = parseInt(req.params.user_id);
    const orders = await store.orderByUser(user_id);
    res.json(orders);
  };
*/
/*
  const completedOrderByUser = async (req: Request, res: Response) => {
    const user_id: number = parseInt(req.params.user_id);
    const orders = await store.completedOrderByUser(user_id);
    res.json(orders);
  };
  */

const addProduct = async (req: Request, res: Response) => {
  const quantity: number = req.body.quantity;
  const order_id: number = req.body.order_id;
  const product_id: number = req.body.product_id;

  const productAdded = await store.addProduct(quantity, order_id, product_id);
  res.json(productAdded);
};

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', index),
    app.get('/orders/:id', show),
    app.post('/orders', create),
    app.post('/orders/close/:id', closeOrderStatus),
    app.post('/orders/:id', deleteOrder),
    app.post('/orders/add-product', addProduct);
  //app.get('/order-by-user/:user-id', orderByUser)
  //app.get('/completed-orders/:user-id', completedOrderByUser)
};

export default ordersRoutes;
