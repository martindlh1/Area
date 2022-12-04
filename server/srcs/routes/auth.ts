import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { UserModel, UserSchema } from "../database/schema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { localStrat, jwtStrat } from "../passport/strategy";
import mongoose from "mongoose";

dotenv.config();
const router = express.Router();

passport.use(localStrat);
passport.use(jwtStrat);

router.post("/register", async (req, res) => {
  const userModel = mongoose.model("UserModel", UserSchema);

  const user = await userModel.findOne({ username: req.body.username });
  if (user != null) return res.status(405).send("Username already exist");

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new UserModel({
    username: req.body.username,
    password: hashedPassword,
    services: [],
  });
  newUser.save((err) => {
    if (err) {
      console.log(err);
      return res.status(402).send("Error while saving User on database");
    }
  });
  res.sendStatus(200);
});

router.post(
  "/login",
  passport.authenticate("local", { session: false, failureMessage: false }),
  function (req, res, next) {
    if (req.user) {
      const token = jwt.sign(
        { user: req.user! },
        process.env.JWT_SECRET || "",
        { expiresIn: "2h" }
      );
      return res.json({ token });
    }
  }
);

router.get("/register/:service", (req, res, next) => {
  passport.authenticate(req.params.service + "-auth", {
    state: "register " + req.query.callback,
  })(req, res, next);
});

router.get("/login/:service", (req, res, next) => {
  passport.authenticate(req.params.service + "-auth", {
    state: "login " + req.query.callback,
  })(req, res, next);
});

router.get("/:service/callback", (req: any, res: any, next: any) => {
  passport.authenticate(req.params.service + "-auth", async (profile: any) => {
    console.log(profile);
    const userModel = mongoose.model("UserModel", UserSchema);
    if (req.query.state.split(" ")[0] === "register") {
      const user = await userModel.findOne({ username: profile.id });
      if (user != null) return res.status(405).send("User already exist");
      const hashedPassword = await bcrypt.hash(profile._raw, 10);
      const newUser = new UserModel({
        username: profile.id,
        password: hashedPassword,
        services: [],
      });
      newUser.save((err) => {
        if (err) {
          console.log(err);
          return res.status(402).send("Error while saving User on database");
        }
      });
      return res.redirect(req.query.state.split(" ")[1]);
    } else if (req.query.state.split(" ")[0] === "login") {
      const user = await userModel.findOne({ username: profile.id });
      if (user == null) return res.status(400).send("No User matching");
      if (await bcrypt.compare(profile._raw, user.password!)) {
        const token = jwt.sign({ user: user }, process.env.JWT_SECRET || "", {
          expiresIn: "2h",
        });
        return res.redirect(req.query.state.split(" ")[1] + "?jwt=" + token);
      }
      return res.status(401).send("Invalid account");
    } else console.log(req.query);
    return res.status(400).send(`Error with ${req.params.service} account`);
  })(req, res, next);
});

module.exports = router;
