import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId ,
      required: true,
      ref:'user'
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    content: {
      type: Array,
    },
    isdelete:{
      type:Boolean,
      default:false
    },
  },
  {
    timestamps: true,
  }
);

export const postModel = model("post", postSchema);
