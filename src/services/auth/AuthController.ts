import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import randtoken from 'rand-token';
import { HTTP400Error, HTTP401Error } from '../../utils/httpErrors';
import { createUser, getByEmail, getByRefreshToken } from './AuthModel';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

export const registerNewUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new HTTP400Error();
  }

  let hashPassword = bcrypt.hashSync(password, 8);
  let refreshToken = randtoken.uid(256);

  try {
    let id = await createUser(email, hashPassword, refreshToken);

    const accessToken = jwt.sign({ sub: id }, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: 300,
    });
    return { accessToken, refreshToken };
  } catch (e) {
    throw new HTTP400Error('This email already exists');
  }
};

export const authenticate = async (email: string, password: string) => {
  if (!email || !password) {
    throw new HTTP400Error();
  }

  let user = await getByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.hash_password)) {
    throw new HTTP401Error();
  }

  const accessToken = jwt.sign({ sub: user.id }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 300,
  });

  return { accessToken, refreshToken: user.refresh_token };
};

export const generateAccessToken = async (refreshToken: string) => {
  let user = await getByRefreshToken(refreshToken);

  if (!user) {
    throw new HTTP401Error();
  }

  const accessToken = jwt.sign({ sub: user.id }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 300,
  });

  return accessToken;
};
