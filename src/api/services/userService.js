import { createUserModel } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const users = [];
let nextId = 1;
const SECRET = process.env.JWT_SECRET || 'change_this_secret_in_prod';

export function createUser({ nome, email, password, administrador = false }) {
  const user = createUserModel({ id: nextId++, nome, email, password, administrador });
  users.push(user);
  return { message: 'Cadastro realizado com sucesso', user };
}

export function authenticate(email, password) {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return null;
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
  return token;
}

export function clearAll() {
  users.length = 0;
  nextId = 1;
}
