import passport from "passport";
import { Strategy as DiscordStrat, Profile } from "passport-discord";

passport.use(
  new DiscordStrat(
    {
      clientID: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      callbackURL: "http://localhost:8080/service/discord/callback",
      scope: ["identify", "email", "connections"],
      passReqToCallback: true,
    },
    async function (
      req: any,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      callback: any
    ) {
      const service = {
        id: 2,
        token: accessToken,
        refreshToken: refreshToken,
      };
      callback(null , service);
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
