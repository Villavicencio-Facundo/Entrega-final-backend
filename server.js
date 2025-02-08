import express from 'express';
import path from 'path';
import { connectDB } from './db.js';  
import { router as productsRoutes } from './routes/products.routes.js';  
import { router as cartsRoutes } from './routes/carts.routes.js';  

const app = express();

connectDB();

app.set('view engine', 'hbs');
app.set('views', path.join(path.resolve(), 'views'));


app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use('/products', productsRoutes);
app.use('/carts', cartsRoutes);


app.get('/', (req, res) => {
  res.render('home');  
});


app.get('/products', (req, res) => {
  res.render('products');  
});


app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
