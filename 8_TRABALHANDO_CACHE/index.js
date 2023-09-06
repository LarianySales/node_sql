const { application, response } = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const pool = require('./db/conn')

const port = 4444

//receber dados do front-end  -json
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


//configurar a TEMPLATE ENGINE -handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//configurar para ler arquivos estático -middleware
app.use(express.static('public'))

//rota -> localhost:4444
app.get('/', (req, res) => {
    return res.render('home')
})
// rota -> localhost:4444/books/insertbook
app.post('/books/insertbook', (req, res) => {
    const { title, nm_paginas } = req.body
    const sql = `INSERT INTO books (title, nm_paginas) VALUES ('${title}', '${nm_paginas}')`
    //para inserir os dados nas colunas escolhidas, as aspas são necessária para dizer que é um texto ali
    pool.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        return res.redirect('/')
    })
})

//localhost:4444/books => listar livros
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books'
    pool.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        const books = data
        // console.log(books) - para não mostrar no console (01/09)
        res.render('books', { books })
    })


})

// mostrar só um livro
app.get('/books/:id', (req, res) => {
    const id = req.params.id
    // console.log(id)

    const sql = `SELECT * FROM books WHERE id = ${id}`

    pool.query (sql, (err,data)=>{
 if(err){
    console.log(err)
 }
 const book = data[0]// para receber só o objeto
//  console.log(book)
 return res.render('book',{book})
    })
    
})
//edição primera etapa --------------------------------
app.get('/books/edit/:id',(req,res)=>{

    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = ${id}`

    pool.query(sql,(err,data)=>{
        if(err){
            console.log(err)
        }
        const book = data[0]
    return res.render('editbook',{book})

    })
    // const id = req.params.id
    console.log(id)
})//.-----------------------------------------------------
 //edição segunda etapa
 app.post('/books/updatebook',(req,res)=>{
    const {id, title, nm_paginas} = req.body

    const sql =`UPDATE books SET title=' ${title}', nm_paginas='${nm_paginas}' WHERE id = ${id}`

    pool.query(sql,(err)=>{
      if(err){
        console.log(err)
        return
      }
      return res.redirect('/books')
    })

 })
 //--------------------------------------------------------------

// ROTA DE EXCLUSÃO
app.post('/books/remove/:id',(req,res)=>{
    const id = req.params.id
    // console.log(id)
const sql = `DELETE FROM books WHERE id = ${id}`

pool.query(sql, (err)=>{
    if(err){
        console.log(err)
        return
    }
    return res.redirect('/books')
})


})
//-----------------------------------------------------------

//trabalhar com mysql

app.listen(port, () => {
    console.log(`Servidor on ${port}`)
})
//estabelecendo uma conexão com o bancos
// conn.connect((err) => {
//     if (err) {
//         console.log(err)
//         return
//     } else {
//         console.log('MYSQL Conectado')
//     }
 

// })




