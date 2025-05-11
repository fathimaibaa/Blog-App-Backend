import { createBlog,deletePost,getAllPost,getMyPosts,getPostById,getPostByIdAndUpdate } from "../database/repository/postRepository.js";
import cloudinary from "../utils/cloudinary.js";

export const createPost = async (req, res, next) => {
  try {
    console.log("", req.body);
    const { title, category, content } = req.body;
    const parsedData = JSON.parse(content);
    for (const image of parsedData) {
      if (image["insert"]?.image) {
      const url =   await cloudinary.uploader.upload(image['insert']?.image,{ folder: "Blog_Assets" })
      image['insert'].image = url.secure_url
      }
    }
    console.log(parsedData);
    
    const buffer = Buffer.from(req.file.buffer).toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${buffer}`;
    const thumbnailUrl = (
      await cloudinary.uploader.upload(dataUri, { folder: "Blog_Assets" })
    ).secure_url;
    console.log(req.userId);
    
    const blog = await createBlog({
      userId: req.userId,
      title,
      category,
      thumbnail: thumbnailUrl,
      content: JSON.stringify(parsedData),
    });
    res.status(201).json({success:true,message:"blog created", post: blog,})
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllPosts = async(req,res,next)=>{
  try {
  const allPosts = await getAllPost()
  res.status(200).json({success:true,message:'all blogs fetched',posts:allPosts})
  } catch (error) {
    console.error(error);
  }
}

export const getPost = async(req,res,next)=>{
  try {
    console.log('jo');
    
    const {id} = req.params
    const postData =await getPostById(id)
    res.status(200).json({success:true,post:postData})
  } catch (error) {
    console.error(error);
    throw error
    
  }
}

export const myPosts = async(req,res,next)=>{
  try {
   const myPosts = await getMyPosts(req.userId)
   res.status(200).json({success:true,post:myPosts})
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const editPost = async(req,res,next)=>{
  try {
    console.log("", req.body);
    const { title, category, content, postId,thumbnail} = req.body;
    const parsedData = JSON.parse(content);
    for (const image of parsedData) {
      if (image["insert"]?.image) {
      const url =   await cloudinary.uploader.upload(image['insert']?.image,{ folder: "Blog_Assets" })
      image['insert'].image = url.secure_url
      }
    }
    console.log(parsedData);
    let thumbnailUrl
    if(req.file){
      const buffer = Buffer.from(req.file.buffer).toString("base64");
      const dataUri = `data:${req.file.mimetype};base64,${buffer}`;
       thumbnailUrl = (
        await cloudinary.uploader.upload(dataUri, { folder: "Blog_Assets" })
      ).secure_url;
    }
    

    console.log(req.userId);
    
    const blog = await getPostByIdAndUpdate(postId,{
      userId: req.userId,
      title,
      category,
      thumbnail: thumbnailUrl || thumbnail,
      content: JSON.stringify(parsedData),
    });
    res.status(201).json({success:true,message:"blog updated", post: blog,})
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const deletePostById = async(req,res,next)=>{
  try {
    const {postId} = req.body
    const data = await deletePost(postId)
     res.status(200).json({success:true,message:'post deleted successfully',postId:data._id})
  } catch (error) {
    console.error(error);
    next(error)
    
  }
}