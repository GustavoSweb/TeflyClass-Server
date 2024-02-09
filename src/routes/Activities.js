import express from 'express';
import Activities from '../controllers/ActivitiesController.js';
import AuthAdmin from '../middlewares/AuthAdmin.js';
import AuthUser from '../middlewares/AuthUser.js';

const Router = express.Router()

Router.get('/activity', Activities.GetAll)
Router.get('/activity/:id', Activities.GetOne)

Router.post('/activity', Activities.Create)
Router.delete('/activity/:id', Activities.Delete)


export default Router
