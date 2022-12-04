"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("../database/schema");
const router = express_1.default.Router();
async function verifAdmin(req, res, next) {
    if (req.user.username === process.env.ADMIN_ID && await bcrypt_1.default.compare(process.env.ADMIN_PSWD, req.user.password))
        next();
    else
        return res.status(400).send("Routes not allowed please connect as admin");
}
router.get("/users", verifAdmin, async (req, res, next) => {
    const userModel = mongoose_1.default.model('UserModel', schema_1.UserSchema);
    const users = await userModel.find();
    return res.status(200).json(users);
});
router.delete("/users/:id", verifAdmin, async (req, res, next) => {
    const userModel = mongoose_1.default.model('UserModel', schema_1.UserSchema);
    if (req.params.id.length != 24)
        return res.status(400).send("User does not exist");
    const deleted = await userModel.findOneAndDelete({ _id: req.params.id });
    if (deleted == null)
        return res.status(400).send("User does not exist");
    return res.sendStatus(200);
});
module.exports = router;
