import { connect } from "mongoose";
import { secrets } from "./secrets.js";
export const db = (async () => {
  const { mongoConnect } = secrets;
  try {
    await connect(mongoConnect);
    console.log("Database connected");
  } catch (error) {
    throw error;
  }
})();
