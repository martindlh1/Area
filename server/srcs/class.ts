export class Areaction {
    serviceId: number;
    id: number;
    name: string;
    desc: string;
    func: {(params: any, token?: string) : Promise<boolean>};
    paramSchem?: {
        type: string,
        desc: string
    }[];
    param: any[];

    constructor(serviceId: number, id: number, name: string, desc: string, func: {(params: any, token?: string) : Promise<boolean>;}, param: any[], paramSchem?: {type: string, desc: string}[]) {
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

export class Service {
    id: number;
    title: string;
    name: string;
    logo: string;
    color: string;
    action: Areaction[];
    reaction: Areaction[];

    constructor(id: number, title: string, name: string, logo: string, color: string, action: Areaction[], reaction: Areaction[]) {
        this.id = id;
        this.title = title;
        this.name = name;
        this.logo = logo;
        this.color = color;
        this.action = action;
        this.reaction = reaction;
    }
}

export class Area {
    id: string;
    userId: string;
    name: string;
    action: Areaction[];
    reaction: Areaction[];
    interval: number;
    clock: number;
    on: boolean;

    constructor(id: string, userId: string, name: string, action: Areaction[], reaction: Areaction[], interval: number, on: boolean) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.action = action;
        this.reaction = reaction;
        this.interval = interval;
        this.clock = 0;
        this.on = on;
    }

    checkInterval(nb: number): boolean {
        this.clock += nb;
        console.log(this.name + ": " + this.clock + "/" + this.interval);
        if (this.clock >= this.interval) {
            this.clock = 0;
            return true;
        }
        return false;
    }
}