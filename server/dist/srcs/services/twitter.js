"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTwitterFollowersNb = exports.postTweet = void 0;
const twitter_api_v2_1 = require("twitter-api-v2");
const client = new twitter_api_v2_1.TwitterApi({
    appKey: "79a8iAqDmtHFla53FAFVzezPo",
    appSecret: "3is4YZsnl8bnCJeeFalabgYaZvJ5KaMsxWsAPPXxGuqluUjMoN",
    accessToken: "1574324481455276032-rDMNtvPeKL2tGa6hliw9cu50PBkN5p",
    accessSecret: "Y9FmYVnLtqABhaWtVm1JlZLvb1dqNRVzoJunBwiTP3jZ0",
});
const postTweet = async (body) => {
    try {
        await client.v2.tweet(body);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.postTweet = postTweet;
const checkTwitterFollowersNb = async (nb) => {
    const followers = await client.v2.followers((await client.currentUserV2()).data.id);
    console.log(`Active followers: ${followers.data.length} / Asked: ${nb}`);
    if (followers.data.length >= nb) {
        return true;
    }
    else {
        return false;
    }
};
exports.checkTwitterFollowersNb = checkTwitterFollowersNb;
