import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { HTTP401Error } from '../utils/httpErrors';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'] as string;

  if (!authHeader) {
    throw new HTTP401Error();
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    throw new HTTP401Error();
  }
};
