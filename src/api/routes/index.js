import express from 'express';
import usersRouter from './users.js';
import productsRouter from './products.js';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/products', productsRouter);

export default router;
