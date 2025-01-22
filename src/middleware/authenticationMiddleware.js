import { verifyAccessToken } from "../utils/jwt.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies['accessToken'];    
    const verifyToken = await verifyAccessToken(token);
    console.log(verifyToken);
    
    if (!verifyToken) {
      const error = new Error();
      error.message = "Invalid Token";
      error.statusCode = 401;
      throw error;
    }  
    req.userId = verifyToken._id
    next();
  } catch (error) {
    next(error);
  }
};
