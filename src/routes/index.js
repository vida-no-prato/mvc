const express = require('express');
const router = express.Router();

// Importar rotas existentes
const homeRoutes = require('./home');
const produtosRoutes = require('./produtos');
const categoriasRoutes = require('./categorias');
const checkoutRoutes = require('./checkout');
const adminRoutes = require('./admin');
const pedidoRoutes = require('./pedido');
// Importar as rotas de autenticação
const authRoutes = require('./auth');

// Usar as rotas
router.use('/', homeRoutes);
router.use('/produtos', produtosRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/admin', adminRoutes);
router.use('/pedido', pedidoRoutes);
// Usar as rotas de autenticação
router.use('/auth', authRoutes);

module.exports = router;