const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const mysql = require('mysql2')
const port = 4444

//configurar a TEMPLATE ENGINE -handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//configurar para ler arquivos estático -middleware
app.use(express.static('public'))

//rota -> localhost:4444
app.get('/', (req, res) => {
    return res.render('home')
})

//trabalhar com mysql
//----- criando conexão com o banco
const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',                         //esasas indfos tem noo mysql na parte de perfil e tals
    user: 'aluno_medio',
    password: '@lunoSenai23.',
    database: 'banco2'
})
//estabelecendo uma conexão com o bancos
conn.connect((err) => {
    if (err) {
        console.log(err)
        return
    } else {
        console.log('MYSQL Conectado')
    }
    app.listen(port, () => {
        console.log(`Servidor on ${port}`)
    })

})




