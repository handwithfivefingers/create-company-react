import { authenticated } from "../authenticate";

import { signuploadform } from "./config";
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dojswen0t",
  api_key: "776779258413574",
  api_secret: "oOhO32uMsnxj4biMWhb9bU88SZc",
});

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await getSignCloud(req, res);
  }
}

const getSignCloud = authenticated(async (req, res) => {
  const sig = signuploadform();
  console.log(sig);
  res.json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname: "dojswen0t",
    apikey: "776779258413574",
  });
});
