import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(req.params.pid);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
});

router.post('/', async (req, res) => {
  const product = req.body;
  const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];

  for (const field of requiredFields) {
    if (product[field] === undefined) {
      return res.status(400).json({ error: `Falta el campo obligatorio: ${field}` });
    }
  }

  const addedProduct = await productManager.addProduct(product);
  res.status(201).json(addedProduct);
});

router.put('/:pid', async (req, res) => {
  const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
  if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(updatedProduct);
});

router.delete('/:pid', async (req, res) => {
  const deleted = await productManager.deleteProduct(req.params.pid);
  if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json({ message: 'Producto eliminado correctamente' });
});

export default router;
