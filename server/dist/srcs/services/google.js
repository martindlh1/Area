"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImSubscribed = exports.likeVideo = exports.postComment = void 0;
const axios_1 = __importDefault(require("axios"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
passport_1.default.use('google-auth', new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: ["profile"],
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback: true,
}, function (req, accessToken, refreshToken, profile, callback) {
    callback(profile);
    return;
}));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: ["profile",
        "https://www.googleapis.com/auth/youtube.force-ssl",
        "https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/youtubepartner"],
    callbackURL: "http://localhost:8080/service/youtube/callback",
    passReqToCallback: true,
}, function (req, accessToken, refreshToken, profile, callback) {
    const service = {
        id: 1,
        token: accessToken,
        refreshToken: refreshToken,
    };
    callback(null, service);
    return;
}));
const postComment = async (param, token) => {
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet`;
    const body = JSON.stringify({
        snippet: {
            channelId: param[0],
            videoId: param[1],
            topLevelComment: {
                snippet: {
                    textOriginal: param[2],
                },
            },
        },
    });
    try {
        await axios_1.default.post(url, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.postComment = postComment;
const likeVideo = async (param, token) => {
    const url = "https://www.googleapis.com/youtube/v3/videos/rate?part=id&channelId=${param[0]}";
    const body = {
        id: param[0],
        rating: "like",
    };
    try {
        await axios_1.default.post(url, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return true;
    }
    catch (err) {
        // console.log(err);
        return false;
    }
};
exports.likeVideo = likeVideo;
const checkImSubscribed = async (param, token) => {
    let pageToken = "";
    const url = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true`;
    try {
        while (pageToken !== undefined) {
            const res = await (0, axios_1.default)({
                method: "get",
                url: url + `&pageToken=${pageToken}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            for (let i = 0; i < res.data.items.length; i++) {
                if (res.data.items[i].snippet.resourceId.channelId === param[0]) {
                    return true;
                }
            }
            pageToken = res.data.nextPageToken;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.checkImSubscribed = checkImSubscribed;
