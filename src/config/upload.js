const multer = require('multer');
const path = require('path');

// Garante que o diretório de uploads exista
const fs = require('fs');
const dir = 'src/public/images/uploads/';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Define o local de armazenamento das imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // O diretório onde os arquivos serão salvos
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Cria um nome de arquivo único para evitar conflitos (ex: imagem-1678886400000-123456789.jpg)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'produto-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtro de arquivo para aceitar apenas imagens (jpeg, png, gif)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Erro: Apenas arquivos de imagem (jpeg, jpg, png, gif) são permitidos!'));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    // Limite de 5MB por arquivo
    fileSize: 1024 * 1024 * 5
  }
});

module.exports = upload;