import { Strategy as GitHubStrategy } from "passport-github2";
import passport from 'passport';
import axios from 'axios';

passport.use('github', new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: "http://localhost:8080/service/github/callback",
    scope: ['repo']
  },
  function(accessToken : any, refreshToken : any, expires_in: any , profile : any, callback : any) {
	const service = {
		id: 7,
		token: accessToken,
		refreshToken: refreshToken
	}
	callback(null, service);
	return;
	}
));


export async function checkIfOddRepo(param : string[], token? : string) : Promise<boolean> {
    const url = `https://api.github.com/user/repos`;
    
    try {
        const response = await axios.get(url, {
            headers: {
                "Accept" : "application/vnd.github+json",
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
        response.data.forEach((repo:any) => { console.log(repo.name) });
        if (response.data.length % 2 == 1)
            return true;
        return false
    } catch(error) {
        console.log(error);
        return false;
    }
}

export async function createRepo(param : string[], token? : string) : Promise<boolean> {
    const url = `https://api.github.com/user/repos`;
    try {
        const response = await axios.post(url, {
            name: param[0],
            description: param[1],
        }, {
            headers: {
                "Accept" : "application/vnd.github+json",
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
        return true
    } catch(error) {
        console.log(error);
        return false;
    }
}

export async function hasCommited(param : string[], token? : string) : Promise<boolean> {
    const url = `https://api.github.com/repos/${param[0]}/${param[1]}/commits`;
    try {
        const response = await axios.get(url, {
            headers: {
                "Accept" : "application/vnd.github+json",
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].commit.author.name == param[2])
                return true;
        }
        return false
    } catch(error) {
        console.log(error);
        return false;
    }
}

export async function postIssue(param : string[], token? : string) : Promise<boolean> {
    const url = `https://api.github.com/repos/${param[0]}/${param[1]}/issues`;
    try {
        const response = await axios.post(url, {
            title: param[2],
            body: param[3],
        }, {
            headers: {
                "Accept" : "application/vnd.github+json",
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
        return true
    } catch(error) {
        console.log(error);
        return false;
    }
}
