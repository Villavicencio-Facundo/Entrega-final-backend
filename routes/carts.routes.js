import { Router } from 'express';
import Cart from '../models/cart.js';
import Product from '../models/product.js'; 

const router = Router();


router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().populate('productId');
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos del carrito' });
  }
});


router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;

  try {

    const existingCart = await Cart.findOne({ productId });

    if (existingCart) {

      existingCart.quantity += quantity;
      await existingCart.save();
      return res.status(200).json(existingCart);
    }

    const newCart = new Cart({ productId, quantity });
    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json({ message: 'Error al agregar el producto al carrito' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCart = await Cart.findByIdAndDelete(id);
    if (!deletedCart) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }
    res.status(200).json({ message: 'Producto eliminado del carrito correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
  }
});


router.delete('/', async (req, res) => {
  try {
    await Cart.deleteMany();  
    res.status(200).json({ message: 'Carrito vaciado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al vaciar el carrito' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cantidad del producto en el carrito' });
  }
});

export { router };
