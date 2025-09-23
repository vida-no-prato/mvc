const express = require('express');
const router = express.Router();

// Rota para página de checkout
router.get('/', (req, res) => {
    res.render('checkout');
});

module.exports = router;
