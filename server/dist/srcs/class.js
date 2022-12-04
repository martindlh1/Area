"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Area = exports.Service = exports.Areaction = void 0;
class Areaction {
    constructor(serviceId, id, name, desc, func, param, paramSchem) {
        this.serviceId = serviceId;
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.func = func;
        this.paramSchem = paramSchem;
        this.param = param;
    }
    clone() {
        return new Areaction(this.serviceId, this.id, this.name, this.desc, this.func, this.param, this.paramSchem);
    }
}
exports.Areaction = Areaction;
class Service {
    constructor(id, title, name, logo, color, action, reaction) {
        this.id = id;
        this.title = title;
        this.name = name;
        this.logo = logo;
        this.color = color;
        this.action = action;
        this.reaction = reaction;
    }
}
exports.Service = Service;
class Area {
    constructor(id, userId, name, action, reaction, interval, on) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.action = action;
        this.reaction = reaction;
        this.interval = interval;
        this.clock = 0;
        this.on = on;
    }
    checkInterval(nb) {
        this.clock += nb;
        console.log(this.name + ": " + this.clock + "/" + this.interval);
        if (this.clock >= this.interval) {
            this.clock = 0;
            return true;
        }
        return false;
    }
}
exports.Area = Area;
