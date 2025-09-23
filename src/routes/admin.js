const express = require('express');
const router = express.Router();

// Rota para painel admin
router.get('/', (req, res) => {
    res.render('admin');
});

module.exports = router;
