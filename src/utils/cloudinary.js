import { v2 as cloudinary } from "cloudinary";

import {
secrets
} from "../config/secrets.js";

const {cloud_name,cloudinaryApiKey,cloudinaryApiSecret} =secrets

 const cloudinaryConfig =  cloudinary.config({
  cloud_name: cloud_name,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

export default cloudinary
