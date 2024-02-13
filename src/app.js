import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import UserRouter from "./routes/User.js";
import TokenRouter from "./routes/Tokens.js";
import ClassroomRouter from "./routes/Classroom.js";
import ActivitiesRouter from "./routes/Activities.js";
import ProjectsRouter from "./routes/Projects.js";
import ArchivesRouter from "./routes/Archives.js";

import cors from "cors";
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", UserRouter);
app.use("/", ActivitiesRouter);
app.use("/", ProjectsRouter);
app.use("/", ClassroomRouter);
app.use("/", TokenRouter);
app.use("/", ArchivesRouter);

app.get("/", (req, res) => {
  res.send("Api TeflyClass");
});

export default app;
