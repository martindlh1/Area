"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAllArea = void 0;
const index_1 = require("../index");
const index_2 = require("../index");
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./database/schema");
const checkArea = async (area, timer) => {
    var _a, _b;
    var actionIsValid = true;
    var reactionIsValid = true;
    var actionLength = area.action.length;
    const userModel = mongoose_1.default.model('UserModel', schema_1.UserSchema);
    if (area.checkInterval(timer) === true) {
        for (let i = 0; i < actionLength; i++) {
            const user = await userModel.findOne({ _id: area.userId });
            actionIsValid = await area.action[i].func(area.action[i].param, (_a = user.services.find(x => x.id == area.action[i].serviceId)) === null || _a === void 0 ? void 0 : _a.token);
            if (!actionIsValid) {
                console.log("Actions not valid");
                return;
            }
            if (i == actionLength - 1) {
                console.log("Actions valid");
                for (let j = 0; j < area.reaction.length; j++)
                    area.reaction[j].func(area.reaction[j].param, (_b = user.services.find(x => x.id == area.reaction[j].serviceId)) === null || _b === void 0 ? void 0 : _b.token)
                        .then((res) => {
                        if (res) {
                            console.log("Reaction valid");
                        }
                        else
                            console.log("Reaction not valid");
                    });
            }
        }
    }
};
const checkAllArea = () => {
    var i = 0;
    for (let area of index_1.areas.values()) {
        if (area.on === true) {
            checkArea(area, index_2.interval)
                .catch((err) => {
                console.log(err);
            });
            i++;
        }
    }
};
exports.checkAllArea = checkAllArea;
