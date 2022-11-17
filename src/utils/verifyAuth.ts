import express, { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//middleware that handles authentication process
const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): void => {
  const authHeader: string = req.headers.authorization as string;
  try {
    const token: string = authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(401);
    res.json('Access denied');
  }
};

export default verifyAuthToken;
