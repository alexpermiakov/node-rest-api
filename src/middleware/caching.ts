import { Request, Response, NextFunction } from 'express';
import { promisify } from 'util';
import { redisClient } from '../config/redis';

const getAsync = promisify(redisClient.get).bind(redisClient);

const getFromCache = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let query = req.query.q as string;
  let data = await getAsync(query);

  if (data) {
    res.status(200).send(data);
  } else {
    next();
  }
};

export { getFromCache };
