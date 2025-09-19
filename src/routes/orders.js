const express = require('express');
const router = express.Router();
const { novoPedido, getPedidos } = require('../controllers/orderController');

router.post('/', novoPedido);
router.get('/:usuario_id', getPedidos);

module.exports = router;