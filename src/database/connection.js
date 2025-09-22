const mysql = require('mysql2/promise');

async function connect() {
  const connection = await mysql.createConnection({
    host: 'localhost', // endereço do MySQL
    user: 'root', // usuário do MySQL
    password: 'sua_senha', // senha do MySQL
    database: 'mvc_db' // nome do banco
  });
  return connection;
}

module.exports = { connect };