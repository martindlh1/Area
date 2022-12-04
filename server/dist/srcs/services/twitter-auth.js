"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const CLIENT_HOME_PAGE_URL = "http://localhost:8081";
const router = express_1.default.Router();
const TwitterStrategy = require("passport-twitter");
passport_1.default.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "/redirect",
}, () => { }));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies,
        });
    }
});
// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate.",
    });
});
// When logout, redirect to client
router.get("/logout", (req, res) => {
    //   req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
});
// auth with twitter
router.get("/login", passport_1.default.authenticate("twitter"));
// redirect to home page after successfully login via twitter
router.get("/redirect", passport_1.default.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/twitter/login/failed",
}));
module.exports = router;
