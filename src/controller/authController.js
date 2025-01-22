import {
  createUser,
  getUserByEmail,
} from "../database/repository/userRepository.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { createAccessToken } from "../utils/jwt.js";

export const signup = async (req, res, next) => {
  try {
    const { uname, email, password, confirmPassword } = req.body;
    if (!uname || !email || !password || !confirmPassword) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "provide All Information";
      throw error;
    }
    if (password !== confirmPassword) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "password not matching";
      throw error;
    }
    const isUserRegistered = await getUserByEmail(email);
    if (isUserRegistered) {
      const error = new Error();
      error.message = "user with the same email exist";
      error.statusCode = 400;
      throw error;
    }
    const hashedPassword = await hashPassword(password);
    await createUser({ uname, email, password: hashedPassword });
    res.status(201).json({ success: true, message: "signup success" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "Provide necessary Info";
      throw error;
    }
    const isValidUser = await getUserByEmail(email);
    console.log("isUserValid", isValidUser);

    if (!isValidUser) {
      const error = new Error();
      error.statusCode = 403;
      error.message = "signup to continue";
      throw error;
    }
    const validPassword = await comparePassword(
      password,
      isValidUser?.password
    );
    if (!validPassword) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "Invalid password";
      throw error;
    }
    const accessToken = await createAccessToken({
      ...isValidUser,
      password: null,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "None",
      secure:true
    });
    res
      .status(200)
      .json({ success: true, message: "login success", user: {...isValidUser,password:''}  });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


export const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
