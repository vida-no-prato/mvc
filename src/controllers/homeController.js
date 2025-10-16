const Categoria = require('../models/categoria');
const Produto = require('../models/produto');

class HomeController {
    // Método para renderizar a página inicial (landing page)
    async index(req, res) {
        try {
            // Buscar produtos e categorias do banco de dados
            const categorias = await Categoria.listar();
            const categoriaSlug = req.query.categoria;
            let produtos;
            if (categoriaSlug) {
                produtos = await Produto.listarPorCategoria(categoriaSlug);
            } else {
                produtos = await Produto.listar();
            }
            
            // Renderizar a view com os dados dinâmicos
            res.render('index', {
                title: 'Vida no Prato - Comida Saudável',
                produtos: produtos,
                categorias: categorias,
                currentCategoria: categoriaSlug || 'todos',
                currentYear: new Date().getFullYear()
            });
        } catch (error) {
            console.error('Erro ao carregar a página inicial:', error);
            res.status(500).render('error', {
                title: 'Erro Interno',
                message: 'Ocorreu um erro interno. Tente novamente mais tarde.',
            });
        }
    }

    // Método para a página de categorias
    async categories(req, res) {
        try {
            const categorias = await Categoria.listar();
            const categoriaSlug = req.query.categoria;
            let produtos = [];
            if (categoriaSlug) {
                // load products for this category
                const Produto = require('../models/produto');
                produtos = await Produto.listarPorCategoria(categoriaSlug);
            }

            res.render('categories', {
                title: 'Categorias - Vida no Prato',
                categorias: categorias,
                produtos: produtos,
                currentCategoria: categoriaSlug || 'todos',
                currentYear: new Date().getFullYear()
            });
        } catch (error) {
            console.error('Erro ao carregar página de categorias:', error);
            res.status(500).render('error', {
                title: 'Erro Interno',
                message: 'Ocorreu um erro interno. Tente novamente mais tarde.'
            });
        }
    }

    // Método para página sobre (caso queira expandir)
    about(req, res) {
        res.render('about', {
            title: 'Sobre Nós - Vida no Prato',
            currentYear: new Date().getFullYear()
        });
    }

    // Método para processar formulário de contato (simulado)
    contact(req, res) {
        try {
            const { name, email, message } = req.body;
            console.log('Novo contato recebido:', { name, email, message });
            res.json({
                success: true,
                message: 'Mensagem enviada com sucesso!'
            });
        } catch (error) {
            console.error('Erro ao processar contato:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao enviar mensagem. Tente novamente.'
            });
        }
    }
}

module.exports = new HomeController();