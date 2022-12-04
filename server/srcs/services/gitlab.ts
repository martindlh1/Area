import axios from 'axios';
import passport from 'passport';
import dotenv from 'dotenv';
import { create } from 'domain';

const GitLabStrategy = require('passport-gitlab2').Strategy;

passport.use(new GitLabStrategy({
    clientID: process.env.GITLAB_CLIENT_ID!,
    clientSecret: process.env.GITLAB_CLIENT_SECRET!,
    callbackURL: "http://localhost:8080/service/gitlab/callback",
    scope : ['api read_user']
  },
  function(accessToken : any, refreshToken : any, expires_in : any, profile : any, callback : any) {
	const service = {
		id: 0,
		token: accessToken,
		refreshToken: refreshToken
	}
	callback(null, service);
	return;
	}
));

async function getUserID(token : string) : Promise<string> {
    const url = `https://gitlab.com/api/v4/user`;
    try {
        const response = await axios.get(url, {
            headers: {
                "Accept" : "application/json",
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });
        return response.data.id
    } catch(error) {
        console.log(error);
        return "";
    }
}

export async function projectExist(param : string[], token? : string) : Promise<boolean>
{
    const id = await getUserID(token!)
    const url = `https://gitlab.com/api/v4/users/${id}/projects/`
    try {
		const response = await axios.get(url,
		{
			headers: {
				"Authorization": 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		});
        for (let i = 0; i < response.data.length; i++) {
            if (param[0] === response.data[i].name)
                return true
        }
        return false
	} catch(error) {
		return false;
	}
}

export async function createProject(param : string[], token? : string) : Promise<boolean>
{
    const url = `https://gitlab.com/api/v4/projects`
    try {
        const response = await axios({
            method: 'post',
            url: url,
            data: {
                name : param[1]
            },
			headers: {
                'PRIVATE-TOKEN': param[0],
				"Authorization": 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
        })
        return true
	} catch(error) {
		return false;
	}
}

async function getProjectID(project : string, token : string) : Promise<string>
{
    const id = await getUserID(token!)
    const url = `https://gitlab.com/api/v4/users/${id}/projects/`
    try {
        const response = await axios.get(url,
        {
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        });
        for (let i = 0; i < response.data.length; i++) {
            if (project === response.data[i].name)
                return response.data[i].id
        }
        return ""
    } catch(error) {
        return "";
    }
}

export async function deleteProject(param : string[], token? : string) : Promise<boolean>
{
    const id = await getProjectID(param[1], token!)

    const url = `https://gitlab.com/api/v4/projects/${id}`
    try {
        const response = await axios({
            method: 'delete',
            url: url,
            headers: {
                'PRIVATE-TOKEN': param[0],
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
        return true
    } catch(error) {
        return false;
    }
}

export async function checkBirthday(param : string[], token? : string) : Promise<boolean>
{
    const url = 'https://gitlab.com/api/v4/user/'
    try {
		const response = await axios.get(url,
		{
			headers: {
				"Authorization": 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		});
        if (response.data.created_at.includes(new Date().toLocaleString().split(',')[0]))
            return true
        return false
	} catch(error) {
		return false;
	}
}