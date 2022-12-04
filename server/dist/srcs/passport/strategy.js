"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrat = exports.localStrat = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("../database/schema");
const dotenv_1 = __importDefault(require("dotenv"));
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
dotenv_1.default.config();
passport_1.default.serializeUser((user, done) => {
    done(null, user.username);
});
passport_1.default.deserializeUser((username, done) => {
    const userModel = mongoose_1.default.model("UserModel", schema_1.UserSchema);
    userModel.find({ username: username }, (err, user) => {
        if (err) {
            console.log(err);
        }
        done(null, user);
    });
});
exports.localStrat = new passport_local_1.Strategy(async function verify(username, password, done) {
    const userModel = mongoose_1.default.model("UserModel", schema_1.UserSchema);
    const user = await userModel.findOne({ username: username });
    if (user == null) {
        return done(null, false, { message: "No user with that name" });
    }
    try {
        if (!user.password) {
            return done(null, false, { message: "No password defined" });
        }
        if (await bcrypt_1.default.compare(password, user.password)) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: "Password incorrect" });
        }
    }
    catch (e) {
        return done(e);
    }
});
exports.jwtStrat = new JWTStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async function (jwt_payload, done) {
    const userModel = mongoose_1.default.model("UserModel", schema_1.UserSchema);
    const user = await userModel.findOne({ _id: jwt_payload.user._id });
    if (user) {
        return done(null, user);
    }
    else {
        return done(null, false);
    }
});
