import { createUserModel } from '../models/userModel.js';

const users = [];
let nextId = 1;

export function createUser({ nome, email, password, administrador = false }) {
  const user = createUserModel({ id: nextId++, nome, email, password, administrador });
  users.push(user);
  return { message: 'Cadastro realizado com sucesso', user };
}

export function authenticate(email, password) {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return null;
  // simple token for demo purposes
  return `token-${user.id}`;
}

export function clearAll() {
  users.length = 0;
  nextId = 1;
}
