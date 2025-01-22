import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { secrets } from "./config/secrets.js";
import router from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import {db} from './config/dbConnection.js'
const {PORT} = secrets
const app = express();

app.use(cors({
    origin:'https://blog-app-frontend-lime.vercel.app/',
    credentials:true
}))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));
 