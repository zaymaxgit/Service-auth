import { Express, Request, Response } from "express";
const { google } = require("googleapis");
const GOOGLE_CLIENT_ID = "CLIENT_ID";
const GOOGLE_CLIENT_SECRET = "GOOGLE_CLIENT_SECRET";

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/auth/google/callback"
);

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["email", "profile"],
  include_granted_scopes: true,
});

let auth = false;

exports.home = async (req: Request, res: Response) => {
  let oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  if (auth) {
    let userInfo = await oauth2.userinfo.v2.me.get();
    res.end(`<a href="http://localhost:3000/logout">Logout</a> 
    <h1>Info</h1>
    <p>${JSON.stringify(userInfo.data)}</p>`);
  } else {
    res.send("Hello");
  }
};

exports.googleLogin = async (req: Request, res: Response) => {
  res.redirect(authorizationUrl);
};

exports.googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code;
  if (code) {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    auth = true;
  }
  res.redirect("/");
};

exports.googleLogout = (req: Request, res: Response) => {
  oauth2Client.revokeCredentials().then((r: any) => console.log("revoke ", r));
  auth = false;
  res.redirect("/");
};
