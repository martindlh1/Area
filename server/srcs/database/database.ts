import mongoose from "mongoose";
import { Areaction, Area } from "../class";
import { AreaSchema } from "./schema";
import { areas } from "../..";
import { services } from "../services/services";

export function createArea(schema: any): Area | null {
  //recuperation of the actions & reaction from the json
  var ac: Areaction[] = [];
  var reac: Areaction[] = [];
  try {
    for (let i = 0; i < schema.actions.length; i++) {
      ac.push(
        services[schema.actions[i].serviceId].action[schema.actions[i].id].clone()
      );
      ac[i].param = schema.actions[i].param;
    }
    for (let i = 0; i < schema.reactions.length; i++) {
      reac.push(
        services[schema.reactions[i].serviceId].reaction[
          schema.reactions[i].id
        ].clone()
      );
      reac[i].param = schema.reactions[i].param;
    }
  } catch (err) {
    console.error(err);
    return null;
  }

  //creation of the Area object
  var area = new Area(
    schema._id,
    schema.userId,
    schema.name,
    ac,
    reac,
    schema.interval,
    schema.on
  );
  return area;
}

export const areasLoader = async () => {
  const areaModel = mongoose.model("AreaModel", AreaSchema);

  const allAreas = await areaModel.find();
  allAreas.forEach((ae) => {
    const area = createArea(ae.toJSON());
    if (area != null)
      areas.push(area!);
  });
  console.log(`DataBase Loaded`);
};
