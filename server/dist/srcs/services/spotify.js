"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playSong = exports.checkIfTop = exports.isFollowingJul = void 0;
const passport_1 = __importDefault(require("passport"));
const axios_1 = __importDefault(require("axios"));
const passport_spotify_1 = require("passport-spotify");
passport_1.default.use(new passport_spotify_1.Strategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    scope: [
        "user-read-email",
        "user-follow-read",
        "user-read-private",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-playback-state",
    ],
    callbackURL: "http://localhost:8080/service/spotify/callback",
}, function (accessToken, refreshToken, expires_in, profile, callback) {
    const service = {
        id: 4,
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
async function isFollowingJul(param, token) {
    const jul = "3IW7ScrzXmPvZhB27hmfgy";
    const url = `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${jul}`;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });
        if (response.data[0] === true) {
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
exports.isFollowingJul = isFollowingJul;
async function checkIfTop(param, token) {
    const url = "  https://api.spotify.com/v1/me/top/artists";
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });
        for (let i = 0; i < response.data.items.length; i++) {
            if (response.data.items[i].name === param[0]) {
                return true;
            }
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.checkIfTop = checkIfTop;
async function playSong(param, token) {
    let response;
    try {
        response = await axios_1.default.get("https://api.spotify.com/v1/me/player/devices", {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });
    }
    catch (error) {
        console.log(error);
        return false;
    }
    const url = `https://api.spotify.com/v1/me/player/play?device_id=${response.data.devices[0].id}`;
    axios_1.default
        .put(url, { uris: ["spotify:track:" + param[0]], position_ms: 0 }, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
        console.log(response.data);
    })
        .catch((error) => {
        console.log(error);
        return false;
    });
    return true;
}
exports.playSong = playSong;
