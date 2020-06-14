import { Request, Response, NextFunction } from 'express';
import { getPlacesByName } from './SearchController';
import { checkSearchParams } from '../../middleware/checks';
import { authenticate } from '../../middleware/authenticate';
import { getFromCache } from '../../middleware/caching';

export default [
  {
    path: '/api/v1/search',
    method: 'get',
    handler: [
      checkSearchParams,
      (req: Request, res: Response, next: NextFunction) => {
        const key = 'search-' + req.query.q;
        getFromCache(key, res, next);
      },
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q as string);
        res.status(200).send(result);
      },
    ],
  },
  {
    path: '/api/v1/search/protected',
    method: 'get',
    handler: [
      authenticate,
      checkSearchParams,
      (req: Request, res: Response, next: NextFunction) => {
        const key = 'search-' + req.query.q;
        getFromCache(key, res, next);
      },
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q as string);
        res.status(200).send(result);
      },
    ],
  },
];
