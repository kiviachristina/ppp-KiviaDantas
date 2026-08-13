import { createProductModel } from '../models/productModel.js';

const products = [];
let nextId = 1;

export function createProduct({ nome, preco, descricao, quantidade }) {
  const product = createProductModel({ id: nextId++, nome, preco, descricao, quantidade });
  products.push(product);
  return { message: 'Cadastro realizado com sucesso', product };
}

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

export function updateProduct(id, changes) {
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...changes };
  return products[idx];
}

export function deleteProduct(id) {
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
}

export function clearAll() {
  products.length = 0;
  nextId = 1;
}
