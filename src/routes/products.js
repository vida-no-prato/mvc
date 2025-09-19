const express = require('express');
const router = express.Router();
const { getProdutos } = require('../controllers/productController');

router.get('/', getProdutos);

module.exports = router;
