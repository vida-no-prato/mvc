const express = require('express');
const router = express.Router();
const { getCategorias } = require('../controllers/categoryController');

router.get('/', getCategorias);

module.exports = router;