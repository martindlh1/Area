import passport from 'passport';
import axios from "axios";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";

passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID!,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    callbackURL: "http://localhost:8080/service/microsoft/callback",
    scope: ['user.read', "mail.send", "mail.read", "offline_access"],
    passReqToCallback: true
  },
  function (req : any, accessToken : any, refreshToken : any, profile : any, callback : any) {
    const service = {
      id: 3,
      token: accessToken,
      refreshToken: refreshToken,
    };
    callback(null , service);
    return;
  }
));

passport.serializeUser((user: any, done: any) => {
  done(null, user.username);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

export async function hasNumberMail(param : string[], token? : string) : Promise<boolean> {
  const url = "https://graph.microsoft.com/v1.0/me/messages";

  try {
    let response = await axios.get(url,
      {
        headers: {
                  "Authorization": 'Bearer ' + token,
                },
      })
      let len = 0
      while (response.data['@odata.nextLink'] != undefined) {
        len += response.data.value.length
        try {
          response = await axios.get(response.data['@odata.nextLink'],
          {
            headers: {
                      "Authorization": 'Bearer ' + token,
                    },
          })
        } catch (error) {
          console.log(error)
        }
      }
      if (len > Number(param[0])) {
        console.log("condition validée");
        return true
      }
      return false
  } catch (err) {
    console.log("condition non validée");
    return false
  }
}

export async function hasMailFrom(param : string[], token? : string) : Promise<boolean> {
  const url = "https://graph.microsoft.com/v1.0/me/messages";

  try {
    const response = await axios.get(url,
      {
        headers: {
                  "Authorization": 'Bearer ' + token,
                },
      })
      for (let i = 0; i < response.data.value.length; i++) {
        if (response.data.value[i].from.emailAddress.address === param[0]) {
          return true
        }
      }
      return false
  } catch (err) {
    console.log("condition non validée");
    return false
  }
}

export async function sendMail(param : string[], token? : string) : Promise<boolean> {
  const url = "https://graph.microsoft.com/v1.0/me/sendMail";

  const body = JSON.stringify ({
    message: {
      subject: param[1],
      body: {
        contentType: 'Text',
        content: param[2],
      },
      toRecipients: [
        {
          emailAddress: {
            address: param[0]
          }
        }
      ]
    }
  });
  axios.post(url,
    body,
    {
      headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
              },
    })
  .then(response => {
    console.log("mail sent");
    return true
  })
  .catch(error => {
    console.log(error);
    return false
  })
  return false
}