import * as productService from '../services/productService.js';

export async function createProduct(req, res) {
  try {
    const { nome, preco, descricao, quantidade } = req.body;
    if (!nome || preco == null || !descricao || quantidade == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (typeof preco !== 'number' || preco <= 0) {
      return res.status(422).json({ message: 'Campo preco deve ser um número maior que zero' });
    }
    if (typeof quantidade !== 'number' || quantidade < 0) {
      return res.status(422).json({ message: 'Campo quantidade deve ser número igual ou maior que zero' });
    }
    const product = productService.createProduct({ nome, preco, descricao, quantidade });
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function getProducts(req, res) {
  try {
    const products = productService.getProducts();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function getProductById(req, res) {
  try {
    const product = productService.getProductById(Number(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function updateProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const changes = req.body;
    const updated = productService.updateProduct(id, changes);
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function deleteProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const ok = productService.deleteProduct(id);
    if (!ok) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}
