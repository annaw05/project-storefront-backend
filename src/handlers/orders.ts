import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err){
     res.status(400);
    res.json(err);
  }
  

};

const show = async (req: Request, res: Response) => {
  
  try {
    const id: number = parseInt(req.params.id);
    const order = await store.show(id);
    res.json(order);
  } catch (err){
     res.status(400);
    res.json(err);
  }

};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      //set default order_status is false when order is open
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
  try {
    const newOrderStatus = await store.closeOrderStatus;
    res.json(newOrderStatus);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const order = await store.delete(id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const quantity: number = req.body.quantity;
    const order_id: number = req.body.order_id;
    const product_id: number = req.body.product_id;

    const productAdded = await store.addProduct(quantity, order_id, product_id);
    res.json(productAdded);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.post('/orders/close/:id', closeOrderStatus);
  app.post('/orders/:id', deleteOrder);
  app.post('/orders/add-product', addProduct);
};

export default ordersRoutes;
