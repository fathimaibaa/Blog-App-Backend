import { configDotenv } from "dotenv";
configDotenv()

const {
    PORT,
    mongoConnect,
    JWT_SECRET,
    CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env




export const secrets = {
    PORT : PORT || 3000 ,
    mongoConnect : mongoConnect,
    jwtSecret:JWT_SECRET,
    cloud_name: CLOUD_NAME,
    cloudinaryApiKey: CLOUDINARY_API_KEY,
    cloudinaryApiSecret: CLOUDINARY_API_SECRET
}