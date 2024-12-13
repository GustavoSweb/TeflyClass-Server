import express from "express";
import Bimester from "../controllers/Bimester/Controller.js";
import AuthAdmin from "../middlewares/AuthAdmin.js";
import AuthUser from "../middlewares/AuthUser.js";

const Router = express.Router();

Router.get("/bimester", Bimester.GetAll);
Router.get("/bimester/:id", Bimester.GetOne);

Router.post("/bimester", AuthAdmin, Bimester.Create);
Router.delete("/bimester/:id", AuthAdmin, Bimester.Delete);

export default Router;
