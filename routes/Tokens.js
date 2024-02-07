const express = require('express')
const Router = express.Router()
const Token = require('../controllers/TokenController')

Router.post('/recoverpassword', Token.CreateToken)

module.exports = Router