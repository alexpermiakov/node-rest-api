import { Request, Response } from 'express';
import { authenticate, registerNewUser } from './AuthController';

export default [
  {
    path: '/api/v1/signup',
    method: 'post',
    handler: [
      async (req: Request, res: Response) => {
        const { email, password } = req.body;
        let token = registerNewUser(email, password);

        res.status(200).send({ auth: true, token });
      },
    ],
  },
  {
    path: '/api/v1/signin',
    method: 'post',
    handler: [
      async (req: Request, res: Response) => {
        const { email, password } = req.body;
        let token = authenticate(email, password);

        res.status(200).send({ auth: true, token });
      },
    ],
  },
];
