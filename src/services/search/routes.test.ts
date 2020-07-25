import express, { Router } from 'express';
import request from 'supertest';
import { applyMiddleware, applyRoutes } from '../../utils';
import axios from 'axios';
import middleware from '../../middleware';
import errorHandlers from '../../middleware/errorHandlers';
import routes from '../../services/search/routes';

jest.mock('axios');

const mockedAxios = axios as any;
mockedAxios.get.mockResolvedValue({ data: { features: [] } });

describe('routes', () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);
  });

  test('a valid string query', async () => {
    const response = await request(router).get('/api/v1/search?q=Cham');
    expect(response.status).toEqual(200);
  });

  test('a non-existing api method', async () => {
    const response = await request(router).get('/api/v11/search');
    expect(response.status).toEqual(404);
  });

  test('an empty string', async () => {
    const response = await request(router).get('/api/v1/search?q=');
    expect(response.status).toEqual(400);
  });
});
