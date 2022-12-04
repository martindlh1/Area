"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBirthday = exports.checkFriendsNb = exports.checkIfLiked = exports.checkInPost = void 0;
const axios_1 = __importDefault(require("axios"));
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/service/facebook/callback",
}, function (accessToken, refreshToken, profile, callback) {
    const service = {
        id: 8,
        token: accessToken,
        refreshToken: refreshToken
    };
    callback(null, service);
    return;
}));
async function checkInPost(param, token) {
    const url = `https://graph.facebook.com/v2.8/me/posts/?access_token=${token}`;
    try {
        const response = await axios_1.default.get(url);
        for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].message != undefined && response.data.data[i].message.includes(param[0]))
                return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.checkInPost = checkInPost;
async function checkIfLiked(param, token) {
    const url = `https://graph.facebook.com/v2.8/me/likes/?access_token=${token}`;
    try {
        const response = await axios_1.default.get(url);
        for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].name.includes(param[0]))
                return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.checkIfLiked = checkIfLiked;
async function checkFriendsNb(param, token) {
    const url = `https://graph.facebook.com/v2.8/me/friends/?access_token=${token}`;
    try {
        const response = await axios_1.default.get(url);
        if (response.data.summary.total_count >= parseInt(param[0]))
            return true;
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.checkFriendsNb = checkFriendsNb;
async function checkBirthday(param, token) {
    const url = `https://graph.facebook.com/v2.8/me?fields=likes&access_token=${token}`;
    try {
        const response = await axios_1.default.get(url);
        if (response.data.birthday === new Date().toLocaleString().split(',')[0])
            return true;
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.checkBirthday = checkBirthday;
