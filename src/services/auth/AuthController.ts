import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { HTTP400Error, HTTP401Error } from '../../utils/httpErrors';
import dotenv from 'dotenv';

dotenv.config();

let id = 1;
const getId = () => id++;
const users = new Map();
const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

export const registerNewUser = (email: string, password: string) => {
  if (!email || !password) {
    throw new HTTP400Error();
  }

  let hash_password = bcrypt.hashSync(password, 8);
  let id = getId();
  users.set(email, { hash_password, id });

  const token = jwt.sign({ sub: id }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 300,
  });

  return token;
};

export const authenticate = (email: string, password: string) => {
  if (!email || !password) {
    throw new HTTP400Error();
  }

  let user = users.get(email);

  if (!user || !bcrypt.compareSync(password, user.hash_password)) {
    throw new HTTP401Error();
  }

  const token = jwt.sign({ sub: user.id }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 300,
  });

  return token;
};
