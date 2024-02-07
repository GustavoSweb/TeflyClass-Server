const express = require('express')
const Router = express.Router()
const User = require('../controllers/UserController')
const AuthAdmin = require('../middlewares/AuthAdmin')
const AuthUser = require('../middlewares/AuthUser')

Router.get('/user',AuthAdmin, User.GetUsers)
Router.post('/user', User.CreateUser)
Router.get('/user/:id',AuthAdmin, User.FindUser)
Router.put('/user/:id',AuthAdmin, User.UpdateUser)
Router.delete('/user/:id',AuthAdmin, User.DeleteUser)
Router.put('/changepassword',AuthUser, User.ChangePassword)
Router.post('/login', User.Login)
Router.post('/user/me',AuthUser, User.GetInfoUser)
Router.post('/checkadmin',AuthAdmin, User.validate)

module.exports = Router