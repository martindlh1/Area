"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaModel = exports.UserModel = exports.AreaSchema = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.UserSchema = new Schema({
    username: String,
    password: String,
    services: [
        {
            id: Number,
            token: String,
            refreshToken: String,
        },
    ],
});
exports.AreaSchema = new Schema({
    name: String,
    userId: String,
    interval: Number,
    on: Boolean,
    actions: [
        {
            id: Number,
            serviceId: Number,
            param: [String],
        },
    ],
    reactions: [
        {
            id: Number,
            serviceId: Number,
            param: [String],
        },
    ],
});
exports.UserModel = mongoose_1.default.model("UserModel", exports.UserSchema);
exports.AreaModel = mongoose_1.default.model("AreaModel", exports.AreaSchema);
