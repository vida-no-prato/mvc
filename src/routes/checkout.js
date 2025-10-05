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

const Pedido = require('../models/pedido');

router.post('/finalizar', async (req, res) => {
    try {
        // Recebe os dados detalhados do corpo da requisição
        const { 
            usuario_id, 
            subtotal, 
            taxa_entrega, 
            total, 
            metodo_pagamento, 
            endereco, 
            cart 
        } = req.body;
        
        if (!usuario_id || !total || !cart || cart.length === 0) {
            return res.status(400).json({ success: false, message: 'Dados do pedido incompletos.' });
        }

        const resultado = await Pedido.criar({
            usuario_id,
            subtotal,
            taxa_entrega,
            total,
            metodo_pagamento,
            endereco,
            cart
        });

        res.json(resultado);
    } catch (error) {
        console.error("Erro na rota /checkout/finalizar:", error);
        res.status(500).json({ success: false, message: 'Erro ao processar o pedido.' });
    }
});

module.exports = router;

module.exports = router;