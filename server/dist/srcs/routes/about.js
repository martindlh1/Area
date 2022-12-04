"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = require("../services/services");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    const host = req.socket.remoteAddress.split(':')[3];
    const time = Math.round(new Date().getTime() / 1000);
    const about = {
        client: {
            host: host
        },
        server: {
            current_time: time,
            services: services_1.services.map((service) => {
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
                        });
                    })
                });
            })
        }
    };
    return res.status(200).json(about);
});
module.exports = router;
