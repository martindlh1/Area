"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postActivity = exports.checkLocation = void 0;
const axios_1 = __importDefault(require("axios"));
const passport_1 = __importDefault(require("passport"));
const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;
passport_1.default.use(new LinkedinStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/service/linkedin/callback",
    scope: ["w_member_social", "r_liteprofile", "r_emailaddress"],
    passReqToCallback: true,
}, function (req, token, tokenSecret, profile, callback) {
    const service = {
        id: 5,
        token: token,
        refreshToken: tokenSecret,
    };
    callback(null, service);
    return;
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
const checkLocation = async (param, token) => {
    //Get the user information
    try {
        const res = await axios_1.default.get(`https://api.linkedin.com/v2/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "X-RestLi-Protocol-Version": "2.0.0",
            },
        });
        if (res.data.firstName.preferredLocale.country === param[0])
            return true;
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.checkLocation = checkLocation;
async function postActivity(param, token) {
    let user;
    const headers = {
        Authorization: `Bearer ${token}`,
        "X-RestLi-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
    };
    //Get the user information
    try {
        user = await axios_1.default.get(`https://api.linkedin.com/v2/me`, {
            headers: headers,
        });
    }
    catch (err) {
        console.log(err);
        return false;
    }
    //Create the body request
    const body = {
        author: `urn:li:person:${user.data.id}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
            "com.linkedin.ugc.ShareContent": {
                shareCommentary: {
                    text: param[0],
                },
                shareMediaCategory: "NONE",
            },
        },
        visibility: {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
    };
    //Post the message
    try {
        const res = await (0, axios_1.default)({
            method: "post",
            url: "https://api.linkedin.com/v2/ugcPosts",
            data: body,
            headers: headers,
        });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
exports.postActivity = postActivity;
;
