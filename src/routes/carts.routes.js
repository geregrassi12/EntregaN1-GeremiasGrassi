import { Router } from 'express';
import { CartManager } from '../managers/CartManager.js';

const router = Router();
const manager = new CartManager();

router.post('/', async (req, res) => {
  const newCart = await manager.createCart();
  res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
  const cart = await manager.getCartById(req.params.cid);
  if (cart) res.json(cart.products);
  else res.status(404).json({ error: 'Carrito no encontrado' });
});

router.post('/:cid/product/:pid', async (req, res) => {
  const updatedCart = await manager.addProductToCart(req.params.cid, req.params.pid);
  if (updatedCart) res.json(updatedCart);
  else res.status(404).json({ error: 'Carrito no encontrado' });
});

export default router;
