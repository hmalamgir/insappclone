import express from 'express';
const router = express.Router();
import {
  getMyProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  follow,
  unFollow
} from '../controllers/user.js';

import { protect } from '../middlewares/auth.js';

router.route('/').get(protect, getMyProfile).put(protect, updateUserProfile);

router.route('/follow/:followId').patch(protect, follow);
router.route('/unfollow/:unfollowId').patch(protect, unFollow);

router.route('/all').get(protect, getUsers);
router.route('/all/:id').get(protect, getUserById);

export default router;
