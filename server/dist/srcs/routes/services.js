"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("../database/schema");
const services_1 = require("../services/services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
async function verifyOAuth(req, res, next) {
    const token = req.query.jwt;
    const decoded = jsonwebtoken_1.default.decode(token);
    if (decoded === undefined)
        return res.sendStatus(400);
    req.userId = decoded.user._id;
    next();
}
router.get("/", passport_1.default.authenticate("jwt", { session: false }), async (req, res) => {
    const userModel = mongoose_1.default.model("UserModel", schema_1.UserSchema);
    const user = await userModel.findOne({ _id: req.user._id });
    // console.log(user?.services);
    const connectedService = user === null || user === void 0 ? void 0 : user.services.map((service) => service.id);
    // console.log(connectedService);
    res.json(services_1.services.map((service) => {
        return {
            id: service.id,
            title: service.title,
            name: service.name,
            logo: service.logo,
            color: service.color,
            loged: (connectedService === null || connectedService === void 0 ? void 0 : connectedService.indexOf(service.id)) == -1 ? false : true,
        };
    }));
});
router.get("/:service", passport_1.default.authenticate("jwt", { session: false }), async (req, res) => {
    const service = services_1.services.find((service) => service.name === req.params.service);
    if (!service)
        return res.status(400).send("Service does not exist");
    const userModel = mongoose_1.default.model("UserModel", schema_1.UserSchema);
    const user = await userModel.findOne({ _id: req.user._id });
    const connected = user === null || user === void 0 ? void 0 : user.services.find((s) => s.id === service.id);
    res.status(200).json({
        id: service.id,
        title: service.title,
        name: service.name,
        logo: service.logo,
        color: service.color,
        loged: connected ? true : false,
    });
});
router.get("/:service/action", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    const service = services_1.services.filter((service) => service.name == req.params.service);
    if (service.length == 0)
        return res.status(400).send("Service does not exist");
    res.status(200).json(service[0].action.map((action) => {
        return {
            id: action.id,
            desc: action.desc,
        };
    }));
});
router.get("/:service/reaction", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    const service = services_1.services.filter((service) => service.name == req.params.service);
    if (service.length == 0)
        res.status(400).send("Service does not exist");
    res.status(200).json(service[0].reaction.map((reaction) => {
        return {
            id: reaction.id,
            desc: reaction.desc,
        };
    }));
});
router.get("/:service/action/:actionId", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    const service = services_1.services.filter((service) => service.name == req.params.service);
    if (service.length == 0)
        return res.status(400).send("Service does not exist");
    if (service[0].action[req.params.actionId] === undefined)
        return res.status(401).send("Action does not exist");
    res.status(200).json(service[0].action[req.params.actionId]);
});
router.get("/:service/reaction/:reactionId", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    const service = services_1.services.filter((service) => service.name == req.params.service);
    if (service.length == 0)
        return res.status(400).send("Service does not exist");
    if (service[0].reaction[req.params.reactionId] === undefined)
        return res.status(401).send("Reaction does not exist");
    res.status(200).json(service[0].reaction[req.params.reactionId]);
});
router.get("/:service/logout", passport_1.default.authenticate("jwt", { session: false }), async (req, res) => {
    var _a;
    const userModel = mongoose_1.default.model("UserModel", schema_1.UserSchema);
    const user = await userModel.findOne({ _id: req.user._id });
    const id = (_a = services_1.servicesAuth.get(req.params.service)) === null || _a === void 0 ? void 0 : _a.id;
    let i = 0;
    while (i < (user === null || user === void 0 ? void 0 : user.services.length)) {
        if ((user === null || user === void 0 ? void 0 : user.services[i].id) == id) {
            user === null || user === void 0 ? void 0 : user.services.splice(i, 1);
            user === null || user === void 0 ? void 0 : user.save();
            return res.sendStatus(200);
        }
        i++;
    }
    return res.status(400).send("Not connected to this service");
});
router.get("/:service/auth", verifyOAuth, async (req, res, next) => {
    const service = services_1.servicesAuth.get(req.params.service);
    if (!service)
        return res.status(400).send("Service does not exist");
    service.opt.state = req.userId + " " + req.query.callback;
    passport_1.default.authenticate(service.name, service.opt)(req, res, next);
});
router.get("/service/failure", (req, res) => {
    res.status(400).send("Auth failure");
});
router.get("/:service/callback", (req, res, next) => {
    passport_1.default.authenticate(services_1.servicesAuth.get(req.params.service).name, {
        failureRedirect: "/service/failure",
    }, async (err, service) => {
        if (err) {
            console.log(err);
            return res.status(400).send("Error while connecting to the service");
        }
        const userModel = mongoose_1.default.model("UserModel", schema_1.UserSchema);
        const user = await userModel.findOne({
            _id: req.query.state.split(" ")[0],
        });
        if (user === null || user === void 0 ? void 0 : user.services.find((x) => { var _a; return x.id === ((_a = services_1.servicesAuth.get(req.params.service)) === null || _a === void 0 ? void 0 : _a.id); })) {
            return res.status(400).send("User already logged to service");
        }
        user === null || user === void 0 ? void 0 : user.services.push(service);
        user === null || user === void 0 ? void 0 : user.save();
        return res.redirect(req.query.state.split(" ")[1]);
    })(req, res, next);
});
module.exports = router;
