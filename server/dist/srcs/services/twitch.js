"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFollowersNb = exports.unblockUser = exports.blockUser = exports.checkSubscribed = exports.sendWhisper = exports.isLive = void 0;
const axios_1 = __importDefault(require("axios"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_twitch_latest_1 = require("passport-twitch-latest");
dotenv_1.default.config();
passport_1.default.use(new passport_twitch_latest_1.Strategy({
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/service/twitch/callback",
    scope: ['user_read', 'user:manage:whispers', 'channel:read:subscriptions', 'user:manage:blocked_users']
}, function (accessToken, refreshToken, expires_in, profile, callback) {
    const service = {
        id: 6,
        token: accessToken,
        refreshToken: refreshToken
    };
    callback(null, service);
    return;
}));
async function isLive(param, token) {
    const url = `https://api.twitch.tv/helix/streams?user_login=${param[0]}`;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Client-Id': process.env.TWITCH_CLIENT_ID
            },
        });
        if (response.data.data.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.isLive = isLive;
async function getUserID(username, token) {
    const url = `https://api.twitch.tv/helix/users`;
    try {
        const response = await axios_1.default.get(url, {
            params: {
                login: username
            },
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Client-Id': process.env.TWITCH_CLIENT_ID
            },
        });
        if (response.data.data.length > 0) {
            return response.data.data[0].id;
        }
        else {
            return "";
        }
    }
    catch (error) {
        console.log(error);
        return "";
    }
}
async function sendWhisper(param, token) {
    const userid = await getUserID(param[0], token);
    const touserid = await getUserID(param[1], token);
    if (userid === "" || touserid === "") {
        console.log("error getting user id");
        return false;
    }
    const url = `https://api.twitch.tv/helix/whispers`;
    try {
        const response = await axios_1.default.post(url, { message: param[2] }, {
            params: {
                from_user_id: userid,
                to_user_id: touserid
            },
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Client-Id': 'g6w9ve7dfr9nf3ao135oexabo5ucq6'
            },
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.sendWhisper = sendWhisper;
async function checkSubscribed(param, token) {
    const channelId = await getUserID(param[0], token);
    const url = `https://api.twitch.tv/helix/subscriptions`;
    try {
        const response = await axios_1.default.get(url, {
            params: {
                broadcaster_id: channelId,
            },
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Client-Id': process.env.TWITCH_CLIENT_ID
            },
        });
        if (response.data.total > param[1]) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.checkSubscribed = checkSubscribed;
async function blockUser(param, token) {
    const touserid = await getUserID(param[0], token);
    if (touserid === "") {
        console.log("error getting user id");
        return false;
    }
    const url = `https://api.twitch.tv/helix/users/blocks`;
    try {
        const response = await axios_1.default.put(url, {}, {
            params: {
                target_user_id: touserid
            },
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Client-Id': process.env.TWITCH_CLIENT_ID
            },
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.blockUser = blockUser;
async function unblockUser(param, token) {
    const touserid = await getUserID(param[0], token);
    if (touserid === "") {
        console.log("error getting user id");
        return false;
    }
    const url = `https://api.twitch.tv/helix/users/blocks`;
    try {
        const response = await axios_1.default.delete(url, {
            params: {
                target_user_id: touserid
            },
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Client-Id': process.env.TWITCH_CLIENT_ID
            },
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.unblockUser = unblockUser;
async function checkFollowersNb(param, token) {
    const channelId = await getUserID(param[0], token);
    const url = `https://api.twitch.tv/helix/users/follows`;
    try {
        const response = await axios_1.default.get(url, {
            params: {
                to_id: channelId
            },
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Client-Id': process.env.TWITCH_CLIENT_ID
            },
        });
        if (response.data.total > param[1]) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.checkFollowersNb = checkFollowersNb;
