"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.areasLoader = exports.createArea = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const class_1 = require("../class");
const schema_1 = require("./schema");
const __1 = require("../..");
const services_1 = require("../services/services");
function createArea(schema) {
    //recuperation of the actions & reaction from the json
    var ac = [];
    var reac = [];
    try {
        for (let i = 0; i < schema.actions.length; i++) {
            ac.push(services_1.services[schema.actions[i].serviceId].action[schema.actions[i].id].clone());
            ac[i].param = schema.actions[i].param;
        }
        for (let i = 0; i < schema.reactions.length; i++) {
            reac.push(services_1.services[schema.reactions[i].serviceId].reaction[schema.reactions[i].id].clone());
            reac[i].param = schema.reactions[i].param;
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
    //creation of the Area object
    var area = new class_1.Area(schema._id, schema.userId, schema.name, ac, reac, schema.interval, schema.on);
    return area;
}
exports.createArea = createArea;
const areasLoader = async () => {
    const areaModel = mongoose_1.default.model("AreaModel", schema_1.AreaSchema);
    const allAreas = await areaModel.find();
    allAreas.forEach((ae) => {
        const area = createArea(ae.toJSON());
        if (area != null)
            __1.areas.push(area);
    });
    console.log(`DataBase Loaded`);
};
exports.areasLoader = areasLoader;
