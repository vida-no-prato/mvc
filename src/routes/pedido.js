const express = require('express');
const router = express.Router();

// Rota para a página de rastreio de um pedido específico
router.get('/rastreio/:id', (req, res) => {
    // Pega o ID do pedido da URL para exibir na página
    const pedidoId = req.params.id;
    res.render('rastreio', { pedidoId: pedidoId });
});

module.exports = router;