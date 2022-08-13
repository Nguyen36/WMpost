import { PostModel } from '../models/PostModel.js';
import express from 'express';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
  try {
    // const post = new PostModel({
    //   title:'test',
    //   content:'test',
    // })
    // post.save()
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getPost = async (req, res) => { 
  const { id } = req.params;

  try {
      const post = await PostModel.findById(id);
      
      res.status(200).json(post);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  try {
    const newPost = req.body;

    const post = new PostModel(newPost);
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const removePost = async (req, res) => {
  
    const {id} = req.params;

    // const post = await PostModel.findByIdAndRemove({_id: remove._id}, {useFindAndModify: false});

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send(`No post with id: ${id}`);
  }
  

  await PostModel.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully." })
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, attachment } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) 
  {
    return res.status(404).send(`No post with id: ${id}`);
  }
 

  const updatedPost = {  title, content, attachment, _id: id };

  await PostModel.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostModel.findById(id);

  const updatedPost = await PostModel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  
  res.json(updatedPost);
}