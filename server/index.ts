import * as dotenv from "dotenv";
import express from "express";
import passport from "passport";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import { Area } from "./srcs/class";
import { checkAllArea } from "./srcs/main_loop";
import { areasLoader } from "./srcs/database/database";

const serviceRoute = require("./srcs/routes/services");
const areasRoute = require("./srcs/routes/areas");
const aboutRoute = require("./srcs/routes/about");
const authRoute = require("./srcs/routes/auth");
const adminRoute = require("./srcs/routes/user");

dotenv.config();
const app = express();
const port = 8080;
var options = {
  inflate: true,
  limit: "100kb",
  type: "application/octet-stream",
};

const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ikjkjum.mongodb.net/area?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("err Mongo:", err);
  });

app.use(cors());

app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.raw(options));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "dogs",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

export const interval = 1000;

export var areas: Area[] = [];

function printUrl(req: any, res: any, next: any) {
  console.log("url: ", req.url);
  next();
}

app.use("/service", serviceRoute);
app.use("/about.json", aboutRoute);
app.use("/areas", passport.authenticate("jwt", { session: false }), areasRoute);
app.use("/auth", authRoute);
app.use("/admin", passport.authenticate("jwt", { session: false }), adminRoute);

setInterval(async () => {
  checkAllArea();
}, interval);

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
  areasLoader();
});
