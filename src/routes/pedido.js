const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido'); // Importar o modelo de Pedido

// Rota para a página de rastreio de um pedido específico
router.get('/rastreio/:id', (req, res) => {
    const pedidoId = req.params.id;
    res.render('rastreio', { pedidoId: pedidoId });
});

// NOVA ROTA ADICIONADA PARA CORRIGIR O ERRO 404
// Rota para a página de histórico de pedidos do usuári
router.get('/meus-pedidos/:usuarioId', async (req, res) => {
    try {
        const { usuarioId } = req.params;
        // Validação simples para garantir que o ID é um número
        if (isNaN(usuarioId)) {
            return res.status(400).send('ID de usuário inválido.');
        }

        // Usa a função do modelo para buscar os pedidos no banco
        const pedidos = await Pedido.buscarPorUsuarioId(usuarioId);
        
        // Renderiza a página 'pedidos.ejs', passando os dados encontrados
        res.render('pedidos', { 
            title: 'Meus Pedidos',
            pedidos: pedidos 
        });
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        res.status(500).render('error', {
            title: 'Erro no Servidor',
            message: 'Não foi possível carregar o histórico de pedidos.'
        });
    }
});

module.exports = router;