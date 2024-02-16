import express from 'express';
import Matter from '../controllers/MatterController.js';
import AuthAdmin from '../middlewares/AuthAdmin.js';
import AuthUser from '../middlewares/AuthUser.js';

const Router = express.Router()

Router.get('/matter', Matter.GetAll)
Router.get('/matter/:id', Matter.GetOne)

Router.post('/matter', Matter.Create)
Router.delete('/matter/:id', Matter.Delete)


export default Router
