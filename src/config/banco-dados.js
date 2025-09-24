const mysql = require('mysql2/promise')

const conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vida_no_prato'
})

module.exports = conexao

