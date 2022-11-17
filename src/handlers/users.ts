import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../utils/verifyAuth';

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const user = await store.show(id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`not able to create user ${user}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
    firstname: '',
    lastname: ''
  };
  try {
    const auth = await store.authenticate(user.username, user.password);
    const token = jwt.sign({ user: auth }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index),
    app.get('/users/:id', verifyAuthToken, show),
    app.post('/users', create),
    app.post('/users/authenticate', authenticate);
};

export default userRoutes;
