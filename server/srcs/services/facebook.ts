import axios from 'axios';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    callbackURL: "http://localhost:8080/service/facebook/callback",
  },
    function(accessToken : any, refreshToken : any, profile : any, callback : any) {
        const service = {
            id: 8,
            token: accessToken,
            refreshToken: refreshToken
        }
        callback(null, service);
        return;
    }
));

export async function checkInPost(param : string[], token? : string) : Promise<boolean> {
    const url = `https://graph.facebook.com/v2.8/me/posts/?access_token=${token}`;
    try {
        const response = await axios.get(url);

        for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].message != undefined && response.data.data[i].message.includes(param[0]))
                return true;
        }
        return false;
    } catch(error) {
        console.log(error);
        return false;
    }
}

export async function checkIfLiked(param : string[], token? : string) : Promise<boolean> {
    const url = `https://graph.facebook.com/v2.8/me/likes/?access_token=${token}`;
    try {
        const response = await axios.get(url);

        for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].name.includes(param[0]))
                return true;
        }
        return false;
    } catch(error) {
        console.log(error);
        return false;
    }
}

export async function checkFriendsNb(param : string[], token? : string) : Promise<boolean> {
    const url = `https://graph.facebook.com/v2.8/me/friends/?access_token=${token}`;
    try {
        const response = await axios.get(url);
        if (response.data.summary.total_count >= parseInt(param[0]))
            return true
        return false
    } catch(error) {
        console.log(error)
        return false
    }
}

export async function checkBirthday(param : string[], token? : string) : Promise<boolean> {
    const url = `https://graph.facebook.com/v2.8/me?fields=likes&access_token=${token}`;
    try {
        const response = await axios.get(url);
        if (response.data.birthday === new Date().toLocaleString().split(',')[0])
            return true;
        return false;
    } catch(error) {
        console.log(error);
        return false;
    }
}

