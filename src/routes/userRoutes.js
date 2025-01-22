import express from 'express'
import { signup , login, logout } from '../controller/authController.js'
import { createPost ,getAllPosts,getPost,myPosts,editPost, deletePostById } from '../controller/postController.js'
import { isAuthenticated } from '../middleware/authenticationMiddleware.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post('/createpost',isAuthenticated,upload.single('thumbnail'),createPost)
router.get('/allposts',isAuthenticated,getAllPosts)
router.get('/post/:id',isAuthenticated,getPost)
router.get('/myblogs',isAuthenticated,myPosts)
router.put('/editpost',isAuthenticated,upload.single('thumbnail'),editPost)
router.patch('/deletepost',isAuthenticated,deletePostById)

export default router