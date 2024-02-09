import express from 'express';
import Classroom from '../controllers/ClassroomController.js';
import AuthAdmin from '../middlewares/AuthAdmin.js';
import AuthUser from '../middlewares/AuthUser.js';

const Router = express.Router()

Router.get('/classroom', Classroom.GetAll)

Router.post('/classroom', Classroom.Create)
Router.delete('/classroom/:id', Classroom.Delete)


export default Router
