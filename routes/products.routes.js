import { Router } from 'express';
import Product from '../models/product.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });  
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

router.post('/', async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  const newProduct = new Product({ name, description, price, imageUrl });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el producto' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, imageUrl },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

export { router };

