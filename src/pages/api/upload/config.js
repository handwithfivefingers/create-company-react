const cloudinary = require("cloudinary").v2;
const apiKey = "oOhO32uMsnxj4biMWhb9bU88SZc";
export const signuploadform = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      eager: "c_pad,h_300,w_400|c_crop,h_200,w_260",
      folder: "pdf_file",
    },
    apiKey,
  );
  return { timestamp, signature };
};
