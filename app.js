
const express = require('express');
const path = require('path');


// Importar rotas
const routes = require('./src/routes');
const adminRoutes = require('./src/routes/admin');
const checkoutRoutes = require('./src/routes/checkout');


const app = express();

// Configuração do EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'src/public')));

// Middleware para parsing de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Usar as rotas
app.use('/', routes);
app.use('/admin', adminRoutes);
app.use('/checkout', checkoutRoutes);

// Middleware para tratamento de erro 404
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Página não encontrada',
        message: 'A página que você está procurando não existe.'
    });
});

// Inicializar servidor
app.listen(3003, () => {
    console.log(`Servidor rodando na porta 3003`);
    console.log(`Acesse: http://localhost:3003`);
});

module.exports = app;