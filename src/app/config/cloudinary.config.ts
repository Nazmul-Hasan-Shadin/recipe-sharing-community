import { v2 as cloudinary } from "cloudinary";

import config from ".";

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.api_key,
  api_secret: config.cloudinary_api_secret,
  // Click 'View API Keys' above to copy your API secret
});

export const cloudinaryUpload = cloudinary;
