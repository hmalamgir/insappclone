import express from 'express';
const router = express.Router();
import {
  createPost,
  getAllPost,
  deletePost,
  likePost,
  getSinglePost,
  updatePost,
  addComment,
  deleteComment,
  getMyPosts,
  getPostsByUserId,
  updateComment
} from '../controllers/post.js';

import { protect } from '../middlewares/auth.js';

router.route('/').get(protect, getAllPost).post(protect, createPost);

router.route('/myposts').get(protect, getMyPosts);

router.route('/user/:userId').get(protect, getPostsByUserId);

router
  .route('/:id')
  .get(protect, getSinglePost)
  .put(protect, updatePost)
  .patch(protect, likePost)
  .delete(protect, deletePost);

router.route('/:id/comments/add').patch(protect, addComment);
router.route('/:id/comments/delete').patch(protect, deleteComment);
router.route('/:id/comments/edit').patch(protect, updateComment);

export default router;
