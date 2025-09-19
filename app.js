const express = require('express');
const path = require('path');
const app = express();

// Configuração do EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'src/public')));

// Middleware para parsing de formulários e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota raiz (página inicial da aplicação web)
app.get('/', (req, res) => {
    res.send('🍃 API GREENEATS rodando'); // Ou renderize uma view: res.render('index')
});

// Rotas da API
app.use('/auth', require('./src/routes/auth'));
app.use('/categorias', require('./src/routes/categories'));
app.use('/produtos', require('./src/routes/products'));
app.use('/pedidos', require('./src/routes/orders'));

// Rotas da aplicação web (caso tenha rotas específicas para páginas)
// opcional

// Middleware para tratamento de erro 404
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Página não encontrada',
        message: 'A página que você está procurando não existe.'
    });
});

// Middleware para tratamento de erros internos (500)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', {
        title: 'Erro interno',
        message: 'Algo deu errado. Tente novamente mais tarde.'
    });
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});

module.exports = app;
