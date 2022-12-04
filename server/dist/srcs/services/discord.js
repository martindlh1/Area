"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_discord_1 = require("passport-discord");
passport_1.default.use(new passport_discord_1.Strategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/service/discord/callback",
    scope: ["identify", "email", "connections"],
    passReqToCallback: true,
}, async function (req, accessToken, refreshToken, profile, callback) {
    const service = {
        id: 2,
        token: accessToken,
        refreshToken: refreshToken,
    };
    callback(null, service);
    return;
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
