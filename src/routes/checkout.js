const express = require('express');
const router = express.Router();

// Rota para a página principal de checkout
router.get('/', (req, res) => {
    res.render('checkout');
});

// NOVA ROTA: Rota para a página de pagamento Pix
router.get('/pix', (req, res) => {
    // Pega o valor total do parâmetro da URL
    const total = req.query.total || '0,00';
    res.render('pix', { total });
});

module.exports = router;