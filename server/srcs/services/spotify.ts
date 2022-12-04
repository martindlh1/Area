import passport from "passport";
import axios from "axios";
import { Strategy as SpotifyStrategy } from "passport-spotify";

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
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
    },
    function (
      accessToken: any,
      refreshToken: any,
      expires_in: any,
      profile: any,
      callback: any
    ) {
      const service = {
        id: 4,
        token: accessToken,
        refreshToken: refreshToken,
      };
      callback(null, service);
      return;
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user.username);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

export async function isFollowingJul(
  param: string[],
  token?: string
): Promise<boolean> {
  const jul = "3IW7ScrzXmPvZhB27hmfgy";
  const url = `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${jul}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (response.data[0] === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function checkIfTop(
  param: string[],
  token?: string
): Promise<boolean> {
  const url = "  https://api.spotify.com/v1/me/top/artists";

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
    for (let i = 0; i < response.data.items.length; i++) {
      if (response.data.items[i].name === param[0]) {
          return true
        }
    }
    return false
  } catch(error) {
    console.log(error);
    return false;
  }
}

export async function playSong(
  param: string[],
  token?: string
): Promise<boolean> {
  let response: any;
  try {
    response = await axios.get(
      "https://api.spotify.com/v1/me/player/devices",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return false;
  }

  const url = `https://api.spotify.com/v1/me/player/play?device_id=${response.data.devices[0].id}`;

  axios
    .put(
      url,
      { uris: ["spotify:track:" + param[0]], position_ms: 0 },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return true;
}
