import express from 'express';
import UserRouter from './routes/User.js';
import TokenRouter from './routes/Tokens.js';
import cors from 'cors';
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', UserRouter)
app.use('/', TokenRouter)

export default app