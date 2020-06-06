import { Request, Response } from 'express';
import {
  authenticate,
  registerNewUser,
  generateAccessToken,
} from './AuthController';

const options = {
  path: '/api/v1/refresh',
  maxAge: 1000 * 60 * 60 * 24 * 90, // would expire after 90 days
  httpOnly: true,
  secure: false,
  signed: false,
};

export default [
  {
    path: '/api/v1/signup',
    method: 'post',
    handler: [
      async (req: Request, res: Response) => {
        const { email, password } = req.body;
        let { accessToken, refreshToken } = registerNewUser(email, password);

        res
          .cookie('refreshToken', refreshToken, options)
          .status(200)
          .send({ auth: true, accessToken });
      },
    ],
  },
  {
    path: '/api/v1/signin',
    method: 'post',
    handler: [
      async (req: Request, res: Response) => {
        const { email, password } = req.body;
        let { accessToken, refreshToken } = authenticate(email, password);

        res
          .cookie('refreshToken', refreshToken, options)
          .status(200)
          .send({ auth: true, accessToken });
      },
    ],
  },
  {
    path: '/api/v1/refresh/token',
    method: 'get',
    handler: [
      async (req: Request, res: Response) => {
        const { refreshToken } = req.cookies;
        let accessToken = generateAccessToken(refreshToken);

        res.status(200).send({ auth: true, accessToken });
      },
    ],
  },
  {
    path: '/',
    method: 'get',
    handler: [
      (req: Request, res: Response) => {
        res.status(200).send(`
          <h1>Create new user</h1>
          <form action="/api/v1/signup" method="POST">
              <div style="margin-bottom: 10px">
                <label for="email">Your email:</label>
                <input id="email" name="email" type="text" />
              </div>
              <div style="margin-bottom: 10px">
                <label for="password">Your password:</label>
                <input id="password" name="password" type="password" />
              </div>
            
              <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
              <input type="submit" value="Submit" />
          </form>
        `);
      },
    ],
  },
];
