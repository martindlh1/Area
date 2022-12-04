import express from "express";
import { services } from "../services/services";

const router = express.Router();

router.get("/", (req: any, res: any) => {
  const host = req.socket.remoteAddress.split(':')[3];
  const time = Math.round(new Date().getTime() / 1000);
  const about = {
    client: {
      host: host
    },
    server: {
      current_time: time,
      services: services.map((service) => {
        return ({
          name: service.name,
          actions: service.action.map((act) => {
            return ({
              name: act.name,
              description: act.desc
            });
          }),
          reactions: service.reaction.map((reac) => {
            return ({
              name: reac.name,
              description: reac.desc
            })
          })
        });
      })
    }
  }
  return res.status(200).json(about);
});

module.exports = router;
