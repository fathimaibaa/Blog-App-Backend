import express from 'express';
import { signup, login, logout } from '../controller/authController.js';
import {
  createPost,
  getAllPosts,
  getPost,
  myPosts,
  editPost,
  deletePostById,
} from '../controller/postController.js';
import { isAuthenticated } from '../middleware/authenticationMiddleware.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Public Blog Routes (accessible to guests)
router.get('/allposts', getAllPosts);        // ✅ Now public
router.get('/post/:id', getPost);            // ✅ Now public

// Protected Blog Routes (only for logged-in users)
router.post('/createpost', isAuthenticated, upload.single('thumbnail'), createPost);
router.get('/myblogs', isAuthenticated, myPosts);
router.put('/editpost', isAuthenticated, upload.single('thumbnail'), editPost);
router.patch('/deletepost', isAuthenticated, deletePostById);

export default router;
