import express from 'express';
import Projects from '../controllers/ProjectsController.js';
import AuthAdmin from '../middlewares/AuthAdmin.js';
import AuthUser from '../middlewares/AuthUser.js';

const Router = express.Router()

Router.get('/project', Projects.GetAll)
Router.get('/project/:id', Projects.GetOne)

Router.patch('/project/:id/finished', Projects.FinishedProject)
Router.put('/project/:id', Projects.Update)

Router.post('/project', Projects.Create)
Router.delete('/project/:id', Projects.Delete)


export default Router
