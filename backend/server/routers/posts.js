import express from 'express';
import { likePost ,getPost,getPosts, createPost, updatePost, removePost } from '../controllers/posts.js';

const router = express.Router();
//http://localhost:5000/posts

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', createPost);

router.patch('/:id', updatePost);

router.delete('/:id', removePost);

router.patch('/:id/likePost', likePost);

export default router;
