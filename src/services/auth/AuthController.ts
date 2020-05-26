import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { HTTP400Error, HTTP401Error } from '../../utils/httpErrors';
import dotenv from 'dotenv';

dotenv.config();

const users = new Map();
const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

export const authenticate = (email: string, password: string) => {
  if (!email || !password) {
    throw new HTTP400Error();
  }

  if (!bcrypt.compareSync(password, users.get(email))) {
    throw new HTTP401Error();
  }

  const token = jwt.sign({ email }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 300,
  });

  return token;
};

export const registerNewUser = (email: string, password: string) => {
  if (!email || !password) {
    throw new HTTP400Error();
  }

  let hash_password = bcrypt.hashSync(password, 8);
  users.set(email, hash_password);

  const token = jwt.sign({ email }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 300,
  });

  return token;
};
