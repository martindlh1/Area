import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import passportJWT from "passport-jwt";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { UserSchema } from "../database/schema";
import dotenv from "dotenv";
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

dotenv.config();

passport.serializeUser((user: any, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  const userModel = mongoose.model("UserModel", UserSchema);

  userModel.find(
    { username: username },
    (err: string, user: mongoose.Document) => {
      if (err) {
        console.log(err);
      }
      done(null, user);
    }
  );
});

export const localStrat = new LocalStrategy(async function verify(
  username,
  password,
  done
) {
  const userModel = mongoose.model("UserModel", UserSchema);

  const user = await userModel.findOne({ username: username });

  if (user == null) {
    return done(null, false, { message: "No user with that name" });
  }
  try {
    if (!user.password) {
      return done(null, false, { message: "No password defined" });
    }
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Password incorrect" });
    }
  } catch (e) {
    return done(e);
  }
});

export const jwtStrat = new JWTStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async function (jwt_payload, done) {
    const userModel = mongoose.model("UserModel", UserSchema);
    const user = await userModel.findOne({ _id: jwt_payload.user._id });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }
);
