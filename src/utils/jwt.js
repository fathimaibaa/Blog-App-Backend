import jwt from "jsonwebtoken";
import { secrets } from "../config/secrets.js";
const { jwtSecret } = secrets;

export const createAccessToken = async (payload) => {
  try {
    return await jwt.sign(payload, jwtSecret);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyAccessToken = async (token) => {
  try {
    return await jwt.verify(token, jwtSecret);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
