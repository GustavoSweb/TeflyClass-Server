import express from 'express';
import Activities from '../controllers/FormsOfEvaluation/Activities/Controller.js';
import AuthAdmin from '../middlewares/AuthAdmin.js';
import AuthUser from '../middlewares/AuthUser.js';

const Router = express.Router()

Router.get('/activity', Activities.GetAll)
Router.get('/activity/:id', Activities.GetOne)

Router.patch('/activity/:id/finished', Activities.FinishedActivity)
Router.patch('/activity/:id/deselect', Activities.DeselectActivity)
Router.put('/activity/:id', Activities.Update)

Router.post('/activity', Activities.Create)
Router.delete('/activity/:id', Activities.Delete)


export default Router
