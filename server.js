const express = require('express')
const app = express()

require('dotenv-safe').config()

//TODO:
//conectar o db
const db = require('./src/data/database')
db.connect()
//usar as rotas
app.use(express.json())

const estudiosRouter = require('./src/routes/estudios.routes')
app.use('/estudios', estudiosRouter)

const titulosRouter = require('./src/routes/titulos.routes')
app.use('/titulos', titulosRouter)

const usuariasRouter = require('./src/routes/usuarias.routes')
app.use('/usuarias', usuariasRouter)

app.listen(3333, () => console.log('listening on port 3333'))