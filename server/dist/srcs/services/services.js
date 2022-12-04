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
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesAuth = exports.services = void 0;
const class_1 = require("../class");
const youtube = __importStar(require("./google"));
const microsoft = __importStar(require("./microsoft"));
const spotify = __importStar(require("./spotify"));
const discord = __importStar(require("./discord"));
const linkedin = __importStar(require("./linkedin"));
const twitch = __importStar(require("./twitch"));
const github = __importStar(require("./github"));
const facebook = __importStar(require("./facebook"));
const gitlab = __importStar(require("./gitlab"));
discord;
const servicesAuth = new Map();
exports.servicesAuth = servicesAuth;
servicesAuth.set("youtube", {
    id: 1,
    name: "google",
    opt: {
        state: "",
    },
});
servicesAuth.set("discord", {
    id: 2,
    name: "discord",
    opt: {
        state: "",
    },
});
servicesAuth.set("microsoft", {
    id: 3,
    name: "microsoft",
    opt: { prompt: "select_account", state: "" },
});
servicesAuth.set("spotify", {
    id: 4,
    name: "spotify",
    opt: {
        state: "",
    },
});
servicesAuth.set("linkedin", {
    id: 5,
    name: "linkedin",
    opt: {
        state: "",
    },
});
servicesAuth.set("twitch", {
    id: 6,
    name: "twitch",
    opt: {
        state: "",
    },
});
servicesAuth.set("github", {
    id: 7,
    name: "github",
    opt: {
        state: "",
    },
});
servicesAuth.set("facebook", {
    id: 8,
    name: "facebook",
    opt: {
        state: "",
    },
});
servicesAuth.set("gitlab", {
    id: 0,
    name: "gitlab",
    opt: {
        state: "",
    },
});
const services = [];
exports.services = services;
services.push(new class_1.Service(0, "Gitlab", "gitlab", "https://i.ibb.co/6XxLFd0/git.png", "#e24329", [
    new class_1.Areaction(0, 0, "check_birthday", "Check if it's your birthday", gitlab.checkBirthday, [], []),
    new class_1.Areaction(0, 1, "check_project_exist", "Check if a project exist", gitlab.projectExist, [], [{ type: "string", desc: "project name" }]),
], [
    new class_1.Areaction(0, 0, "create_project", "Create a project", gitlab.createProject, [], [
        { type: "string", desc: "user private token" },
        { type: "string", desc: "project name" },
    ]),
    new class_1.Areaction(0, 1, "delete_project", "Delete a project", gitlab.deleteProject, [], [
        { type: "string", desc: "user private token" },
        { type: "string", desc: "project name" },
    ]),
]));
services.push(new class_1.Service(1, "YouTube", "youtube", "https://i.ibb.co/Wv822L7/youtube.png", "#FF3445", [
    new class_1.Areaction(1, 0, "check_im_subscribed", "Check if I'm subscribed to a channel", youtube.checkImSubscribed, [], [
        { type: "string", desc: "channelId" },
    ]),
], [
    new class_1.Areaction(1, 0, "like_video", "Like a video", youtube.likeVideo, [], [{ type: "string", desc: "videoId" }]),
    new class_1.Areaction(1, 1, "post_comment", "Post a comment on a video", youtube.postComment, [], [
        { type: "string", desc: "channelId" },
        { type: "string", desc: "videoId" },
        { type: "string", desc: "commentContent" },
    ]),
]));
services.push(new class_1.Service(2, "Discord", "discord", "https://i.ibb.co/7kR7gZY/discord.png", "#7289da", [], []));
services.push(new class_1.Service(3, "Microsoft", "microsoft", "https://i.ibb.co/JnFPv4h/microsoft.png", "#FFB900", [
    new class_1.Areaction(3, 0, "check_number_mail", "Check the number of mails", microsoft.hasNumberMail, [], [{ type: "number", desc: "nbMails" }]),
    new class_1.Areaction(3, 1, "check_new_mail_from", "Check if someone has sent you a mail", microsoft.hasMailFrom, [], [{ type: "string", desc: "author's mail" }]),
], [
    new class_1.Areaction(3, 0, "end_mail", "Send a mail", microsoft.sendMail, [], [
        { type: "string", desc: "recipient" },
        { type: "string", desc: "subject" },
        { type: "string", desc: "content" },
    ]),
]));
services.push(new class_1.Service(4, "Spotify", "spotify", "https://i.ibb.co/wz53t8w/spotify.png", "#1DB954", [
    new class_1.Areaction(4, 0, "check_artist_rank_in_youre_top", "Check if a artist is in you're top listened artists", spotify.checkIfTop, [], [{ type: "string", desc: "artist to check" }]),
], [
    new class_1.Areaction(4, 0, "play_song", "Play a song", spotify.playSong, [], [{ type: "string", desc: "song id" }]),
]));
services.push(new class_1.Service(5, "Linkedin", "linkedin", "https://i.ibb.co/0F0Xnxp/linkedin-1.png", "#0e76a8", [
    new class_1.Areaction(5, 0, "check_location", "Check the location of the user", linkedin.checkLocation, [], [{ type: "string", desc: "location (format: FR - US - etc..)" }]),
], [
    new class_1.Areaction(5, 0, "post", "Post Activity", linkedin.postActivity, [], [{ type: "string", desc: "activityBody" }]),
]));
services.push(new class_1.Service(6, "Twitch", "twitch", "https://i.ibb.co/6wzkjCY/twitch.png", "#6441A5", [
    new class_1.Areaction(6, 0, "check_channel_is_live", "Check if channel is live", twitch.isLive, [], [{ type: "string", desc: "streamerName" }]),
    new class_1.Areaction(6, 1, "check_number_follower", "Check if a channel has x of followers", twitch.checkFollowersNb, [], [
        { type: "string", desc: "streamerId" },
        { type: "number", desc: "nbFollowers" },
    ]),
    new class_1.Areaction(6, 2, "check_subscribers", "Check if user has x subscribers", twitch.checkSubscribed, [], [
        { type: "string", desc: "YourName" },
        { type: "number", desc: "TargetUserName" },
    ]),
], [
    new class_1.Areaction(6, 0, "send_whisper", "Send whisper to user", twitch.sendWhisper, [], [
        { type: "string", desc: "YourName" },
        { type: "string", desc: "TargetUserName" },
        { type: "string", desc: "message" },
    ]),
    new class_1.Areaction(6, 1, "block_user", "Block user", twitch.blockUser, [], [{ type: "string", desc: "TargetUserName" }]),
    new class_1.Areaction(6, 2, "unblock_user", "Unblock user", twitch.unblockUser, [], [{ type: "string", desc: "TargetUserName" }]),
]));
services.push(new class_1.Service(7, "Github", "github", "https://i.ibb.co/BLGsGQb/github.png", "#24292e", [
    new class_1.Areaction(7, 0, "check_repo_number_odd", "Check if number of repo is odd", github.checkIfOddRepo, [], []),
    new class_1.Areaction(7, 1, "check_has_commit", "Check if user has commit", github.hasCommited, [], [
        { type: "string", desc: "username" },
        { type: "string", desc: "repository name" },
        { type: "string", desc: "userToCheck" },
    ]),
], [
    new class_1.Areaction(7, 0, "create_repo", "Create a repository", github.createRepo, [], [
        { type: "string", desc: "repository name" },
        { type: "string", desc: "description" },
    ]),
    new class_1.Areaction(7, 1, "post_issue", "Post an issue", github.postIssue, [], [
        { type: "string", desc: "username" },
        { type: "string", desc: "repository name" },
        { type: "string", desc: "title" },
        { type: "string", desc: "body" },
    ]),
]));
services.push(new class_1.Service(8, "Facebook", "facebook", "https://i.ibb.co/PYS0zVY/facebook.png", "#3b5998", [
    new class_1.Areaction(8, 0, "check_message_in_post", "Check if a message is in a post", facebook.checkInPost, [], [{ type: "string", desc: "message to check in posts" }]),
    new class_1.Areaction(8, 1, "check_if_liked", "Check if a page is liked", facebook.checkIfLiked, [], [{ type: "string", desc: "page to check" }]),
    new class_1.Areaction(8, 2, "check_friends_number", "Check if you have x friends", facebook.checkFriendsNb, [], [{ type: "number", desc: "number of friends" }]),
    new class_1.Areaction(8, 3, "check_birthday", "Check if its your birthday", facebook.checkBirthday, [], []),
], []));
