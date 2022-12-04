import axios from 'axios';
import test from 'node:test';
import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as twitchStrategy } from "passport-twitch-latest";

dotenv.config();
passport.use(new twitchStrategy({
	clientID: process.env.TWITCH_CLIENT_ID!,
	clientSecret:  process.env.TWITCH_CLIENT_SECRET!,
	callbackURL: "http://localhost:8080/service/twitch/callback",
	scope: ['user_read', 'user:manage:whispers', 'channel:read:subscriptions', 'user:manage:blocked_users']
},
function(accessToken : any, refreshToken : any, expires_in : any, profile : any, callback : any) {
	const service = {
		id: 6,
		token: accessToken,
		refreshToken: refreshToken
	}
	callback(null, service);
	return;
	}
));

export async function isLive(param : string[], token? : string) : Promise<boolean> {
	const url = `https://api.twitch.tv/helix/streams?user_login=${param[0]}`;

	try {
		const response = await axios.get(url,
		{
			headers: {
				"Authorization": 'Bearer ' + token,
				'Content-Type': 'application/json',
				'Client-Id': process.env.TWITCH_CLIENT_ID!
			},
		});
		if (response.data.data.length > 0) {
			return true;
		}
		else {
			return false;
		}
	} catch(error) {
		console.log(error);
		return false;
	}
}

async function getUserID(username : string, token : string) : Promise<string> {
	const url = `https://api.twitch.tv/helix/users`;

	try {
		const response = await axios.get(url, {
			params: {
				login: username
			},
			headers: {
				"Authorization": 'Bearer ' + token,
				'Content-Type': 'application/json',
				'Client-Id': process.env.TWITCH_CLIENT_ID!
			},
		});
		if (response.data.data.length > 0) {
			return response.data.data[0].id;
		}
		else {
			return "";
		}
	} catch(error) {
		console.log(error);
		return "";
	}
}

export async function sendWhisper(param : string[], token? : string) : Promise<boolean> {
	const userid = await getUserID(param[0], token!);
	const touserid = await getUserID(param[1], token!);

	if (userid === "" || touserid === "") {
		console.log("error getting user id");
		return false;
	}
	const url = `https://api.twitch.tv/helix/whispers`
	
	try {
		const response = await axios.post(url, { message: param[2] },	
		{
			params: {
				from_user_id: userid,
				to_user_id: touserid
			},
			headers: {
				"Authorization": 'Bearer ' + token,
				'Content-Type': 'application/json',
				'Client-Id': 'g6w9ve7dfr9nf3ao135oexabo5ucq6'
			},
		});
		return true;
	} catch(error) {
		console.log(error);
		return false;
	}
}

export async function checkSubscribed(param : string[], token? : string) : Promise<boolean> {
	const channelId = await getUserID(param[0], token!);
	const url = `https://api.twitch.tv/helix/subscriptions`;

	try {
		const response = await axios.get(url,
		{
			params: {
				broadcaster_id: channelId,
			},
			headers: {
				"Authorization": 'Bearer ' + token,
				'Content-Type': 'application/json',
				'Client-Id': process.env.TWITCH_CLIENT_ID!
			},
		});
		if (response.data.total > param[1]) {
			return true
		}
		return false
	} catch(error) {
		console.log(error);
		return false;
	}
}

export async function blockUser(param : string[], token? : string) : Promise<boolean> {
	const touserid = await getUserID(param[0], token!);

	if (touserid === "") {
		console.log("error getting user id");
		return false;
	}
	const url = `https://api.twitch.tv/helix/users/blocks`
	
	try {
		const response = await axios.put(url, {},	
		{
			params: {
				target_user_id: touserid
			},
			headers: {
				"Authorization": 'Bearer ' + token,
				'Content-Type': 'application/json',
				'Client-Id': process.env.TWITCH_CLIENT_ID!
			},
		});
		return true;
	} catch(error) {
		console.log(error);
		return false;
	}
}

export async function unblockUser(param : string[], token? : string) : Promise<boolean> {
	const touserid = await getUserID(param[0], token!);

	if (touserid === "") {
		console.log("error getting user id");
		return false;
	}
	const url = `https://api.twitch.tv/helix/users/blocks`
	
	try {
		const response = await axios.delete(url,	
		{
			params: {
				target_user_id: touserid
			},
			headers: {
				"Authorization": 'Bearer ' + token,
				'Content-Type': 'application/json',
				'Client-Id': process.env.TWITCH_CLIENT_ID!
			},
		});
		return true;
	} catch(error) {
		console.log(error);
		return false;
	}
}

export async function checkFollowersNb(param : string[], token? : string) : Promise<boolean> {
	const channelId = await getUserID(param[0], token!);
	const url = `https://api.twitch.tv/helix/users/follows`;

	try {
		const response = await axios.get(url,
		{
			params: {
				to_id: channelId
			},
			headers: {
				"Authorization": 'Bearer ' + token,
				'Content-Type': 'application/json',
				'Client-Id': process.env.TWITCH_CLIENT_ID!
			},
		});
		if (response.data.total > param[1]) {
			return true
		}
		return false
	} catch(error) {
		console.log(error);
		return false;
	}
}