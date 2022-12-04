import * as dotenv from "dotenv";
import axios from "axios";
import passport from "passport";
const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;

passport.use(
  new LinkedinStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      callbackURL: "http://localhost:8080/service/linkedin/callback",
      scope: ["w_member_social", "r_liteprofile", "r_emailaddress"],
      passReqToCallback: true,
    },
    function (
      req: any,
      token: string,
      tokenSecret: string,
      profile: any,
      callback: any
    ) {
      const service = {
        id: 5,
        token: token,
        refreshToken: tokenSecret,
      };
      callback(null, service);
      return;
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

export const checkLocation = async (
  param: string[],
  token?: string
): Promise<boolean> => {
	//Get the user information
  try {
    const res = await axios.get(`https://api.linkedin.com/v2/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-RestLi-Protocol-Version": "2.0.0",
      },
    });
    if (res.data.firstName.preferredLocale.country === param[0]) return true;
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export async function postActivity(
  param: string[],
  token?: string
): Promise<boolean> {
	let user;
	const headers = {
		Authorization: `Bearer ${token}`,
		"X-RestLi-Protocol-Version": "2.0.0",
		"Content-Type": "application/json",
	};

	//Get the user information
  try {
    user = await axios.get(`https://api.linkedin.com/v2/me`, {
      headers: headers,
    });
	} catch (err) {
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
		const res = await axios({
			method: "post",
			url: "https://api.linkedin.com/v2/ugcPosts",
			data: body,
			headers: headers,
		});
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};