const express = require('express')
const app = express()
const UserRouter = require('./routes/User')
const TokenRouter = require('./routes/Tokens')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', UserRouter)
app.use('/', TokenRouter)


const PORT = process.env.PORT || 8081
app.listen(PORT,()=> console.log('Servidor Rodando....'))