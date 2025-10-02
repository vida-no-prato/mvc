const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const upload = require('../config/upload'); // Importa a configuração do multer

router.get('/', produtoController.listar);

// A rota de 'criar' agora usa o middleware 'upload.single('imagem')'
// 'imagem' é o nome do campo do formulário que conterá o arquivo
router.post('/', upload.single('imagem'), produtoController.criar);

// A rota de 'editar' também usa o middleware
router.put('/:id', upload.single('imagem'), produtoController.editar);

router.delete('/:id', produtoController.excluir);

module.exports = router;