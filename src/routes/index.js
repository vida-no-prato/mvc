const express = require('express');
const router = express.Router();

// Importar rotas específicas
const homeRoutes = require('./home');
const produtosRoutes = require('./produtos');
const categoriasRoutes = require('./categorias');

// Usar as rotas
router.use('/', homeRoutes);
router.use('/produtos', produtosRoutes);
router.use('/categorias', categoriasRoutes);

// Aqui você pode adicionar outras rotas no futuro:
// const userRoutes = require('./user');
// const adminRoutes = require('./admin');
// router.use('/user', userRoutes);
// router.use('/admin', adminRoutes);

module.exports = router;