import express from "express";
import { Area } from "../class";
import { areas } from "../../index";
import { AreaModel, AreaSchema } from "../database/schema";
import mongoose from "mongoose";
import { createArea } from "../database/database";

const router = express.Router();

//route to create a new Area
router.post("/", (req: any, res: any) => {
  //create the the area model to be save in the database
  // if (req.body.name === undefined || req.body.interval === undefined || req.body.actions === undefined || req.body.actions.length === 0 || req.body.actions.param === undefined || req.body.reactions === undefined || req.body.reactions.length === 0 || req.body.reactions.param === undefined)
    // return res.status(400).send("Area parameters missing or not correct");
  var areaM = new AreaModel({
    name: req.body.name,  
    userId: req.user._id,
    interval: req.body.interval,
    on: true,
    actions: req.body.actions,
    reactions: req.body.reactions,
  });
  
  const area = createArea(areaM.toJSON());
  
  if (area === null) {
    res.status(400).send("Error while trying to create new Area");
  } else {
    //save the model on the database
    areaM.save((err) => {
      if (err) {
        console.log(err);
        return res.status(402).send("Error while saving Area on database");
      }
    });

    //adding the Area object in the areas map with the id provide by the db as key
    areas.push(area!);

    //return succes
    res.sendStatus(200);
  }
});

//route to get all of the areas from a userId
router.get("/", (req: any, res: any) => {
  const areaModel = mongoose.model("AreaModel", AreaSchema);

  areaModel.find(
    { userId: req.user._id },
    (err: string, toSend: typeof AreaModel[]) => {
      if (err) {
        console.log(err);
        return res.status(403).send("Can't find Object in database");
      } else {
        return res.status(200).json(toSend);
      }
    }
  );
});

//route to get one specific area with is Id an the userId
router.get("/:areaId", (req: any, res: any) => {
  const areaModel = mongoose.model("AreaModel", AreaSchema);

  areaModel.findOne(
    { userId: req.user._id, _id: req.params.areaId },
    (err: string, toSend: typeof AreaModel) => {
      if (err) {
        console.log(err);
        return res.status(403).send("Can't find Object in database");
      } else {
        return res.status(200).json(toSend);
      }
    }
  );
});

//route to delete an area from is Id ans the userId
router.delete("/:areaId", (req: any, res: any) => {
  const areaModel = mongoose.model("AreaModel", AreaSchema);

  //delete the area from the database
  areaModel
    .deleteOne({ userId: req.user._id, _id: req.params.areaId })
    .then(() => {
      //delete the area from the area map list
      let idx = 0;
      while (idx < areas.length) {
        if (areas[idx].id == req.params.areaId) {
          areas.splice(idx, 1);
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
router.put("/:areaId", async (req: any, res: any) => {
  const areaModel = mongoose.model("AreaModel", AreaSchema);

  let idx = 0;
  while (idx < areas.length) {
    if (areas[idx].id == req.params.areaId) {
      break;
    }
    idx++;
  }
  if (idx == areas.length) return res.status(403).send("Can't find Object");
  const doc = await areaModel.findOne({
    userId: req.user._id,
    _id: req.params.areaId,
  });
  if (doc === null)
    return res.status(403).send("Can't find Object in database");
  if (req.body.on != undefined) {
    doc!.on = req.body.on;
    areas[idx].on = req.body.on;
  }
  if (req.body.interval != undefined) {
    doc!.interval = req.body.interval;
    areas[idx].interval = req.body.interval;
  }
  if (req.body.name != undefined) {
    doc!.name = req.body.name;
    areas[idx].name = req.body.name;
  }

  //save changes
  doc!.save((err) => {
    if (err) {
      console.log(err);
      return res.status(402).send("Error while saving Area on database");
    }
  });

  res.sendStatus(200);
});

module.exports = router;
