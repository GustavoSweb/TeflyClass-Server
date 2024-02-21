import express from 'express';
import Classroom from '../controllers/Classroom/Controller.js';
import AuthAdmin from '../middlewares/AuthAdmin.js';
import AuthUser from '../middlewares/AuthUser.js';

const Router = express.Router()

Router.get('/classroom', Classroom.GetAll)
Router.get('/classroom/:id', Classroom.GetOne)

Router.post('/classroom', Classroom.Create)
Router.delete('/classroom/:id', Classroom.Delete)


export default Router
