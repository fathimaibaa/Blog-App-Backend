import { postModel } from "../schema/postSchema.js"

export const createBlog = async(data)=>{
    try {
       return await postModel.create(data)
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const getAllPost = async()=>{
    try {
        return await postModel.find({isdelete:false}).populate({path:'userId',select:'uname'})
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const getPostById = async(id)=>{
    try {
       return await postModel.findById({_id:id,isdelete:false})
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const getMyPosts = async(userId)=>{
    try {
        return await postModel.find({userId:userId,isdelete:false})
    } catch (error) {
        console.error(error);
        throw error
        
    }
}

export const getPostByUserId = async(id)=>{
    try {
       return await postModel.findById({user:id,isdelete:false})
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const getPostByIdAndUpdate = async(id,data)=>{
    try {
       return await postModel.findByIdAndUpdate({_id:id},{$set:data})
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const deletePost = async(id)=>{
    try {
        console.log(id);
        return await postModel.findByIdAndUpdate({_id:id},{$set:{isdelete:true}},{$new:true})
    } catch (error) {
        throw error
    }
}