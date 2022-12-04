import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import { UserSchema } from "../database/schema";
import { services, servicesAuth } from "../services/services";
import jwt from "jsonwebtoken";

const router = express.Router();

async function verifyOAuth(req: any, res: any, next: any) {
  const token = req.query.jwt;
  const decoded = jwt.decode(token);
  if (decoded === undefined) return res.sendStatus(400);
  req.userId = (decoded as jwt.JwtPayload).user._id;
  next();
}

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res: any) => {
    const userModel = mongoose.model("UserModel", UserSchema);
    const user = await userModel.findOne({ _id: req.user._id });

    // console.log(user?.services);
    const connectedService = user?.services.map((service) => service.id);
    // console.log(connectedService);
    res.json(
      services.map((service) => {
        return {
          id: service.id,
          title: service.title,
          name: service.name,
          logo: service.logo,
          color: service.color,
          loged: connectedService?.indexOf(service.id) == -1 ? false : true,
        };
      })
    );
  }
);

router.get(
  "/:service",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res: any) => {
    const service = services.find(
      (service) => service.name === req.params.service
    );
    if (!service) return res.status(400).send("Service does not exist");
    const userModel = mongoose.model("UserModel", UserSchema);
    const user = await userModel.findOne({ _id: req.user._id });

    const connected = user?.services.find((s) => s.id === service.id);
    res.status(200).json({
      id: service.id,
      title: service.title,
      name: service.name,
      logo: service.logo,
      color: service.color,
      loged: connected ? true : false,
    });
  }
);

router.get(
  "/:service/action",
  passport.authenticate("jwt", { session: false }),
  (req: any, res: any) => {
    const service = services.filter(
      (service) => service.name == req.params.service
    );

    if (service.length == 0)
      return res.status(400).send("Service does not exist");
    res.status(200).json(
      service[0].action.map((action) => {
        return {
          id: action.id,
          desc: action.desc,
        };
      })
    );
  }
);

router.get(
  "/:service/reaction",
  passport.authenticate("jwt", { session: false }),
  (req: any, res: any) => {
    const service = services.filter(
      (service) => service.name == req.params.service
    );

    if (service.length == 0) res.status(400).send("Service does not exist");
    res.status(200).json(
      service[0].reaction.map((reaction) => {
        return {
          id: reaction.id,
          desc: reaction.desc,
        };
      })
    );
  }
);

router.get(
  "/:service/action/:actionId",
  passport.authenticate("jwt", { session: false }),
  (req: any, res: any) => {
    const service = services.filter(
      (service) => service.name == req.params.service
    );

    if (service.length == 0)
      return res.status(400).send("Service does not exist");
    if (service[0].action[req.params.actionId] === undefined)
      return res.status(401).send("Action does not exist");
    res.status(200).json(service[0].action[req.params.actionId]);
  }
);

router.get(
  "/:service/reaction/:reactionId",
  passport.authenticate("jwt", { session: false }),
  (req: any, res: any) => {
    const service = services.filter(
      (service) => service.name == req.params.service
    );

    if (service.length == 0)
      return res.status(400).send("Service does not exist");
    if (service[0].reaction[req.params.reactionId] === undefined)
      return res.status(401).send("Reaction does not exist");
    res.status(200).json(service[0].reaction[req.params.reactionId]);
  }
);

router.get(
  "/:service/logout",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res: any) => {
    const userModel = mongoose.model("UserModel", UserSchema);
    const user = await userModel.findOne({ _id: req.user._id });
    const id = servicesAuth.get(req.params.service)?.id;
    let i = 0;
    while (i < user?.services.length!) {
      if (user?.services[i].id == id) {
        user?.services.splice(i, 1);
        user?.save();
        return res.sendStatus(200);
      }
      i++;
    }
    return res.status(400).send("Not connected to this service");
  }
);

router.get(
  "/:service/auth",
  verifyOAuth,
  async (req: any, res: any, next: any) => {
    const service = servicesAuth.get(req.params.service);
    if (!service) return res.status(400).send("Service does not exist");
    service.opt.state = req.userId + " " + req.query.callback;
    passport.authenticate(service.name, service.opt)(req, res, next);
  }
);

router.get("/service/failure", (req: any, res: any) => {
  res.status(400).send("Auth failure");
});

router.get("/:service/callback", (req: any, res: any, next: any) => {
  passport.authenticate(
    servicesAuth.get(req.params.service)!.name,
    {
      failureRedirect: "/service/failure",
    },
    async (err: any, service: any) => {
      if (err) {
        console.log(err);
        return res.status(400).send("Error while connecting to the service");
      }
      const userModel = mongoose.model("UserModel", UserSchema);
      const user = await userModel.findOne({
        _id: req.query.state.split(" ")[0],
      });
      if (
        user?.services!.find(
          (x) => x.id === servicesAuth.get(req.params.service)?.id
        )
      ) {
        return res.status(400).send("User already logged to service");
      }
      user?.services.push(service);
      user?.save();
      return res.redirect(req.query.state.split(" ")[1]);
    }
  )(req, res, next);
});

module.exports = router;
