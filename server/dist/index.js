"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.areas = exports.interval = void 0;
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const main_loop_1 = require("./srcs/main_loop");
const database_1 = require("./srcs/database/database");
const serviceRoute = require("./srcs/routes/services");
const areasRoute = require("./srcs/routes/areas");
const aboutRoute = require("./srcs/routes/about");
const authRoute = require("./srcs/routes/auth");
const adminRoute = require("./srcs/routes/user");
dotenv.config();
const app = (0, express_1.default)();
const port = 8080;
var options = {
    inflate: true,
    limit: "100kb",
    type: "application/octet-stream",
};
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ikjkjum.mongodb.net/area?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(mongoDB)
    .then(() => {
    console.log("connected");
})
    .catch((err) => {
    console.log("err Mongo:", err);
});
app.use((0, cors_1.default)());
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.raw(options));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "dogs",
    resave: true,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
exports.interval = 1000;
exports.areas = [];
function printUrl(req, res, next) {
    console.log("url: ", req.url);
    next();
}
app.use("/service", serviceRoute);
app.use("/about.json", aboutRoute);
app.use("/areas", passport_1.default.authenticate("jwt", { session: false }), areasRoute);
app.use("/auth", authRoute);
app.use("/admin", passport_1.default.authenticate("jwt", { session: false }), adminRoute);
setInterval(async () => {
    (0, main_loop_1.checkAllArea)();
}, exports.interval);
app.listen(port, async () => {
    console.log(`App listening on port ${port}`);
    (0, database_1.areasLoader)();
});
