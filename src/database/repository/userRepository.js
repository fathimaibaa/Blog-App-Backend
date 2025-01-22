import { userModel } from "../schema/userSchema.js";

export const createUser = async (data) => {
  try {
    return await userModel.create(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByEmail = async(email)=>{
    try {
        return await userModel.findOne({email:email}).lean()
    } catch (error) {
        console.error(error);
        throw error
        
    }

}

export const getUserById = async(id)=>{
  try {
    return await userModel.findById({_id:id})
  } catch (error) {
    console.error(error);
    throw error
    
  }
}

