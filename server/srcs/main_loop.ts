import { Area } from "./class";
import { areas } from "../index"
import { interval } from "../index"
import mongoose from "mongoose";
import { UserSchema } from "./database/schema";

const checkArea = async (area: Area, timer: number) => {
  var actionIsValid: boolean = true;
  var reactionIsValid: boolean = true;
  var actionLength = area.action.length;
  const userModel = mongoose.model('UserModel', UserSchema);

  if (area.checkInterval(timer) === true) {
    for (let i = 0; i < actionLength; i++) {
      const user = await userModel.findOne({_id: area.userId});
      actionIsValid = await area.action[i].func(area.action[i].param, user!.services!.find(x => x.id == area.action[i].serviceId)?.token)
      if (!actionIsValid) {
        console.log("Actions not valid");
        return;
      }
      if (i == actionLength - 1) {
        console.log("Actions valid");
        for (let j = 0; j < area.reaction.length; j++)
          area.reaction[j].func(area.reaction[j].param, user!.services!.find(x => x.id == area.reaction[j].serviceId)?.token)
          .then((res) => {
            if (res) {
              console.log("Reaction valid");
            } else
              console.log("Reaction not valid");
          });
      }
    }
  }
};

export const checkAllArea = () => {
  var i = 0;
  for (let area of areas.values()) {
    if (area.on === true) {
      checkArea(area, interval)
      .catch((err) => {
        console.log(err);
      });
      i++;
    }
  }
};
