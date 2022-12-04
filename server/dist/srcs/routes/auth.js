"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const schema_1 = require("../database/schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const strategy_1 = require("../passport/strategy");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const router = express_1.default.Router();
passport_1.default.use(strategy_1.localStrat);
passport_1.default.use(strategy_1.jwtStrat);
router.post("/register", async (req, res) => {
    const userModel = mongoose_1.default.model("UserModel", schema_1.UserSchema);
    const user = await userModel.findOne({ username: req.body.username });
    if (user != null)
        return res.status(405).send("Username already exist");
    const hashedPassword = await bcrypt_1.default.hash(req.body.password, 10);
    const newUser = new schema_1.UserModel({
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
router.post("/login", passport_1.default.authenticate("local", { session: false, failureMessage: false }), function (req, res, next) {
    if (req.user) {
        const token = jsonwebtoken_1.default.sign({ user: req.user }, process.env.JWT_SECRET || "", { expiresIn: "2h" });
        return res.json({ token });
    }
});
router.get("/register/:service", (req, res, next) => {
    passport_1.default.authenticate(req.params.service + "-auth", {
        state: "register " + req.query.callback,
    })(req, res, next);
});
router.get("/login/:service", (req, res, next) => {
    passport_1.default.authenticate(req.params.service + "-auth", {
        state: "login " + req.query.callback,
    })(req, res, next);
});
router.get("/:service/callback", (req, res, next) => {
    passport_1.default.authenticate(req.params.service + "-auth", async (profile) => {
        console.log(profile);
        const userModel = mongoose_1.default.model("UserModel", schema_1.UserSchema);
        if (req.query.state.split(" ")[0] === "register") {
            const user = await userModel.findOne({ username: profile.id });
            if (user != null)
                return res.status(405).send("User already exist");
            const hashedPassword = await bcrypt_1.default.hash(profile._raw, 10);
            const newUser = new schema_1.UserModel({
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
        }
        else if (req.query.state.split(" ")[0] === "login") {
            const user = await userModel.findOne({ username: profile.id });
            if (user == null)
                return res.status(400).send("No User matching");
            if (await bcrypt_1.default.compare(profile._raw, user.password)) {
                const token = jsonwebtoken_1.default.sign({ user: user }, process.env.JWT_SECRET || "", {
                    expiresIn: "2h",
                });
                return res.redirect(req.query.state.split(" ")[1] + "?jwt=" + token);
            }
            return res.status(401).send("Invalid account");
        }
        else
            console.log(req.query);
        return res.status(400).send(`Error with ${req.params.service} account`);
    })(req, res, next);
});
module.exports = router;
