import { Request, Response } from 'express';
import { getPlacesByName } from './SearchController';
import { checkSearchParams } from '../../middleware/checks';
import { authenticate } from '../../middleware/authenticate';

export default [
  {
    path: '/api/v1/search',
    method: 'get',
    handler: [
      checkSearchParams,
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
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q as string);
        res.status(200).send(result);
      },
    ],
  },
];
