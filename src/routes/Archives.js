import express from 'express';
import Archives from '../controllers/ArchivesController.js';
import AuthAdmin from '../middlewares/AuthAdmin.js';
import AuthUser from '../middlewares/AuthUser.js';
import multer from "multer";
const upload = multer();

const Router = express.Router()

Router.post('/archive',upload.single('file'), Archives.Create)

export default Router
