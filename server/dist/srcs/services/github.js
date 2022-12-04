"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postIssue = exports.hasCommited = exports.createRepo = exports.checkIfOddRepo = void 0;
const passport_github2_1 = require("passport-github2");
const passport_1 = __importDefault(require("passport"));
const axios_1 = __importDefault(require("axios"));
passport_1.default.use('github', new passport_github2_1.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/service/github/callback",
    scope: ['repo']
}, function (accessToken, refreshToken, expires_in, profile, callback) {
    const service = {
        id: 7,
        token: accessToken,
        refreshToken: refreshToken
    };
    callback(null, service);
    return;
}));
async function checkIfOddRepo(param, token) {
    const url = `https://api.github.com/user/repos`;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
        response.data.forEach((repo) => { console.log(repo.name); });
        if (response.data.length % 2 == 1)
            return true;
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.checkIfOddRepo = checkIfOddRepo;
async function createRepo(param, token) {
    const url = `https://api.github.com/user/repos`;
    try {
        const response = await axios_1.default.post(url, {
            name: param[0],
            description: param[1],
        }, {
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.createRepo = createRepo;
async function hasCommited(param, token) {
    const url = `https://api.github.com/repos/${param[0]}/${param[1]}/commits`;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].commit.author.name == param[2])
                return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.hasCommited = hasCommited;
async function postIssue(param, token) {
    const url = `https://api.github.com/repos/${param[0]}/${param[1]}/issues`;
    try {
        const response = await axios_1.default.post(url, {
            title: param[2],
            body: param[3],
        }, {
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.postIssue = postIssue;
