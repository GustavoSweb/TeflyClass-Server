import express from "express";
import Activities from "../controllers/FormsOfEvaluation/Activities/Controller.js";
import AuthAdmin from "../middlewares/AuthAdmin.js";
import AuthUser from "../middlewares/AuthUser.js";

const Router = express.Router();

Router.get("/activity", AuthUser, Activities.GetAll);
Router.get("/activity/search/:text", AuthUser, Activities.Search);
Router.get("/activity/:id", AuthUser, Activities.GetOne);

Router.patch("/activity/:id/finished", AuthUser, Activities.FinishedActivity);
Router.patch("/activity/:id/deselect", AuthUser, Activities.DeselectActivity);
Router.put("/activity/:id", Activities.Update);

Router.post("/activity", AuthAdmin, Activities.Create);
Router.delete("/activity/:id", AuthAdmin, Activities.Delete);

export default Router;
