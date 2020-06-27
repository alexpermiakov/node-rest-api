import { dbClient } from '../../config/db';

export const createUser = async (
  email: string,
  hashPassword: string,
  refreshToken: string,
) => {
  const res = await dbClient.query(
    'INSERT INTO "CreatedUsers" (email, hash_password,  refresh_token) VALUES($1, $2, $3)  RETURNING id',
    [email, hashPassword, refreshToken],
  );

  return res.rows[0].id;
};

export const getByEmail = async (email: string) => {
  const res = await dbClient.query(
    'SELECT * FROM "CreatedUsers" WHERE email=$1',
    [email],
  );

  return res.rows[0];
};

export const getByRefreshToken = async (refreshToken: string) => {
  const res = await dbClient.query(
    'SELECT * FROM "CreatedUsers" WHERE refresh_token=$1',
    [refreshToken],
  );

  return res.rows[0];
};
