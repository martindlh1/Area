"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBirthday = exports.deleteProject = exports.createProject = exports.projectExist = void 0;
const axios_1 = __importDefault(require("axios"));
const passport_1 = __importDefault(require("passport"));
const GitLabStrategy = require('passport-gitlab2').Strategy;
passport_1.default.use(new GitLabStrategy({
    clientID: process.env.GITLAB_CLIENT_ID,
    clientSecret: process.env.GITLAB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/service/gitlab/callback",
    scope: ['api read_user']
}, function (accessToken, refreshToken, expires_in, profile, callback) {
    const service = {
        id: 0,
        token: accessToken,
        refreshToken: refreshToken
    };
    callback(null, service);
    return;
}));
async function getUserID(token) {
    const url = `https://gitlab.com/api/v4/user`;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                "Accept": "application/json",
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
        return response.data.id;
    }
    catch (error) {
        console.log(error);
        return "";
    }
}
async function projectExist(param, token) {
    const id = await getUserID(token);
    const url = `https://gitlab.com/api/v4/users/${id}/projects/`;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });
        for (let i = 0; i < response.data.length; i++) {
            if (param[0] === response.data[i].name)
                return true;
        }
        return false;
    }
    catch (error) {
        return false;
    }
}
exports.projectExist = projectExist;
async function createProject(param, token) {
    const url = `https://gitlab.com/api/v4/projects`;
    try {
        const response = await (0, axios_1.default)({
            method: 'post',
            url: url,
            data: {
                name: param[1]
            },
            headers: {
                'PRIVATE-TOKEN': param[0],
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.createProject = createProject;
async function getProjectID(project, token) {
    const id = await getUserID(token);
    const url = `https://gitlab.com/api/v4/users/${id}/projects/`;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });
        for (let i = 0; i < response.data.length; i++) {
            if (project === response.data[i].name)
                return response.data[i].id;
        }
        return "";
    }
    catch (error) {
        return "";
    }
}
async function deleteProject(param, token) {
    const id = await getProjectID(param[1], token);
    const url = `https://gitlab.com/api/v4/projects/${id}`;
    try {
        const response = await (0, axios_1.default)({
            method: 'delete',
            url: url,
            headers: {
                'PRIVATE-TOKEN': param[0],
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.deleteProject = deleteProject;
async function checkBirthday(param, token) {
    const url = 'https://gitlab.com/api/v4/user/';
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });
        if (response.data.created_at.includes(new Date().toLocaleString().split(',')[0]))
            return true;
        return false;
    }
    catch (error) {
        return false;
    }
}
exports.checkBirthday = checkBirthday;
