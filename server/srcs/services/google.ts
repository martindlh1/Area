import axios from "axios";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

passport.use(
  'google-auth',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scope: ["profile"],
      callbackURL: "http://localhost:8080/auth/google/callback",
      passReqToCallback: true,
    },
    function(req: any, accessToken: string, refreshToken: string, profile: any, callback: any) {
      callback(profile);
      return;
    }
  )
)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scope: ["profile",
              "https://www.googleapis.com/auth/youtube.force-ssl",
              "https://www.googleapis.com/auth/youtube",
              "https://www.googleapis.com/auth/youtubepartner"],
      callbackURL: "http://localhost:8080/service/youtube/callback",
      passReqToCallback: true,
    },
    function (
      req: any,
      accessToken: string,
      refreshToken: string,
      profile: any,
      callback: any
    ) {
      const service = {
        id: 1,
        token: accessToken,
        refreshToken: refreshToken,
      };
      callback(null , service);
      return;
    }
  )
);

export const postComment = async (
  param: string[],
  token?: string
): Promise<boolean> => {
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
    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const likeVideo = async (
  param: string[],
  token?: string
): Promise<boolean> => {
  const url = "https://www.googleapis.com/youtube/v3/videos/rate?part=id&channelId=${param[0]}";
  const body = {
    id: param[0],
    rating: "like",
  };

  try {
    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return true;
  } catch (err) {
    // console.log(err);
    return false;
  }
};

export const checkImSubscribed = async (
  param: string[],
  token?: string
): Promise<boolean> => {
  let pageToken = "";
  const url = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true`;
  try {
    while (pageToken !== undefined) {
      const res = await axios({
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
  } catch (err) {
    console.log(err);
    return false;
  }
}