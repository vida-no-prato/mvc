const express = require('express');
const router = express.Router();

// Importar rotas existentes
const homeRoutes = require('./home');
const produtosRoutes = require('./produtos');
const categoriasRoutes = require('./categorias');
const checkoutRoutes = require('./checkout'); // Certifique-se que esta linha existe
const adminRoutes = require('./admin');     // Certifique-se que esta linha existe

// Importar as NOVAS rotas de pedido
const pedidoRoutes = require('./pedido');

// Usar as rotas
router.use('/', homeRoutes);
router.use('/produtos', produtosRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/admin', adminRoutes);

// Usar as NOVAS rotas de pedido
router.use('/pedido', pedidoRoutes);

module.exports = router;