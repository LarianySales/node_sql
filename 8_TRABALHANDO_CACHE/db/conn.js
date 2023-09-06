
const mysql = require('mysql2')

//criar conexão com o banco
//----- criando conexão com o banco
//pollConection - criar e estabelecer a conexão
const pool = mysql.createPool({
    connectionLimit: 9,
    host: '127.0.0.1',
    port: '3306',                         //esasas indfos tem noo mysql na parte de perfil e tals
    user: 'aluno_medio',
    password: '@lunoSenai23.',
    database: 'banco2'
})

//FOI CRIADO UM MODULO INTERNO, AGORA VAMOS EXPORTAR
module.exports = pool