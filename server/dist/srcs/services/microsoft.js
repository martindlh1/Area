"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.hasMailFrom = exports.hasNumberMail = void 0;
const passport_1 = __importDefault(require("passport"));
const axios_1 = __importDefault(require("axios"));
const passport_microsoft_1 = require("passport-microsoft");
passport_1.default.use(new passport_microsoft_1.Strategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/service/microsoft/callback",
    scope: ['user.read', "mail.send", "mail.read", "offline_access"],
    passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, callback) {
    const service = {
        id: 3,
        token: accessToken,
        refreshToken: refreshToken,
    };
    callback(null, service);
    return;
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.username);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
async function hasNumberMail(param, token) {
    const url = "https://graph.microsoft.com/v1.0/me/messages";
    try {
        let response = await axios_1.default.get(url, {
            headers: {
                "Authorization": 'Bearer ' + token,
            },
        });
        let len = 0;
        while (response.data['@odata.nextLink'] != undefined) {
            len += response.data.value.length;
            try {
                response = await axios_1.default.get(response.data['@odata.nextLink'], {
                    headers: {
                        "Authorization": 'Bearer ' + token,
                    },
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        if (len > Number(param[0])) {
            console.log("condition validée");
            return true;
        }
        return false;
    }
    catch (err) {
        console.log("condition non validée");
        return false;
    }
}
exports.hasNumberMail = hasNumberMail;
async function hasMailFrom(param, token) {
    const url = "https://graph.microsoft.com/v1.0/me/messages";
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                "Authorization": 'Bearer ' + token,
            },
        });
        for (let i = 0; i < response.data.value.length; i++) {
            if (response.data.value[i].from.emailAddress.address === param[0]) {
                return true;
            }
        }
        return false;
    }
    catch (err) {
        console.log("condition non validée");
        return false;
    }
}
exports.hasMailFrom = hasMailFrom;
async function sendMail(param, token) {
    const url = "https://graph.microsoft.com/v1.0/me/sendMail";
    const body = JSON.stringify({
        message: {
            subject: param[1],
            body: {
                contentType: 'Text',
                content: param[2],
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: param[0]
                    }
                }
            ]
        }
    });
    axios_1.default.post(url, body, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
        },
    })
        .then(response => {
        console.log("mail sent");
        return true;
    })
        .catch(error => {
        console.log(error);
        return false;
    });
    return false;
}
exports.sendMail = sendMail;
