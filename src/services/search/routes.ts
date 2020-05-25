import { Request, Response } from 'express';
import { getPlacesByName } from './SearchController';
import { checkSearchParams } from '../../middleware/checks';

export default [
  {
    path: '/api/v1/search',
    method: 'get',
    handler: [
      checkSearchParams, // <-- this line
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q as string);
        res.status(200).send(result);
      },
    ],
  },
];
