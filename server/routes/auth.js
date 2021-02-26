import express from 'express';
const router = express.Router();
import { signUp, signIn } from '../controllers/auth.js';

import { protect } from '../middlewares/auth.js';

router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;
