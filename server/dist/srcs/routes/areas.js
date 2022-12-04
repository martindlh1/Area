"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../index");
const schema_1 = require("../database/schema");
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../database/database");
const router = express_1.default.Router();
//route to create a new Area
router.post("/", (req, res) => {
    //create the the area model to be save in the database
    // if (req.body.name === undefined || req.body.interval === undefined || req.body.actions === undefined || req.body.actions.length === 0 || req.body.actions.param === undefined || req.body.reactions === undefined || req.body.reactions.length === 0 || req.body.reactions.param === undefined)
    // return res.status(400).send("Area parameters missing or not correct");
    var areaM = new schema_1.AreaModel({
        name: req.body.name,
        userId: req.user._id,
        interval: req.body.interval,
        on: true,
        actions: req.body.actions,
        reactions: req.body.reactions,
    });
    const area = (0, database_1.createArea)(areaM.toJSON());
    if (area === null) {
        res.status(400).send("Error while trying to create new Area");
    }
    else {
        //save the model on the database
        areaM.save((err) => {
            if (err) {
                console.log(err);
                return res.status(402).send("Error while saving Area on database");
            }
        });
        //adding the Area object in the areas map with the id provide by the db as key
        index_1.areas.push(area);
        //return succes
        res.sendStatus(200);
    }
});
//route to get all of the areas from a userId
router.get("/", (req, res) => {
    const areaModel = mongoose_1.default.model("AreaModel", schema_1.AreaSchema);
    areaModel.find({ userId: req.user._id }, (err, toSend) => {
        if (err) {
            console.log(err);
            return res.status(403).send("Can't find Object in database");
        }
        else {
            return res.status(200).json(toSend);
        }
    });
});
//route to get one specific area with is Id an the userId
router.get("/:areaId", (req, res) => {
    const areaModel = mongoose_1.default.model("AreaModel", schema_1.AreaSchema);
    areaModel.findOne({ userId: req.user._id, _id: req.params.areaId }, (err, toSend) => {
        if (err) {
            console.log(err);
            return res.status(403).send("Can't find Object in database");
        }
        else {
            return res.status(200).json(toSend);
        }
    });
});
//route to delete an area from is Id ans the userId
router.delete("/:areaId", (req, res) => {
    const areaModel = mongoose_1.default.model("AreaModel", schema_1.AreaSchema);
    //delete the area from the database
    areaModel
        .deleteOne({ userId: req.user._id, _id: req.params.areaId })
        .then(() => {
        //delete the area from the area map list
        let idx = 0;
        while (idx < index_1.areas.length) {
            if (index_1.areas[idx].id == req.params.areaId) {
                index_1.areas.splice(idx, 1);
                return res.sendStatus(200);
            }
            idx++;
        }
        return res.sendStatus(403);
    })
        .catch((err) => {
        console.log(err);
        return res.status(403).send("Can't find Object in database");
    });
});
// route to modify some area field
router.put("/:areaId", async (req, res) => {
    const areaModel = mongoose_1.default.model("AreaModel", schema_1.AreaSchema);
    let idx = 0;
    while (idx < index_1.areas.length) {
        if (index_1.areas[idx].id == req.params.areaId) {
            break;
        }
        idx++;
    }
    if (idx == index_1.areas.length)
        return res.status(403).send("Can't find Object");
    const doc = await areaModel.findOne({
        userId: req.user._id,
        _id: req.params.areaId,
    });
    if (doc === null)
        return res.status(403).send("Can't find Object in database");
    if (req.body.on != undefined) {
        doc.on = req.body.on;
        index_1.areas[idx].on = req.body.on;
    }
    if (req.body.interval != undefined) {
        doc.interval = req.body.interval;
        index_1.areas[idx].interval = req.body.interval;
    }
    if (req.body.name != undefined) {
        doc.name = req.body.name;
        index_1.areas[idx].name = req.body.name;
    }
    //save changes
    doc.save((err) => {
        if (err) {
            console.log(err);
            return res.status(402).send("Error while saving Area on database");
        }
    });
    res.sendStatus(200);
});
module.exports = router;
