import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import UserRouter from "./routes/User.js";
import TokenRouter from "./routes/Tokens.js";
import ClassroomRouter from "./routes/Classroom.js";

import cors from "cors";
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", UserRouter);
app.use("/", ClassroomRouter);
app.use("/", TokenRouter);
app.get("/", (req, res) => {
  res.send("Api TeflyClass");
});

export default app;
