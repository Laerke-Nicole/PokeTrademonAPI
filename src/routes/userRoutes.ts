import express from 'express';
import { getUserByUsername, checkUsernameExists } from '../controllers/userController';

const router = express.Router();

// ✅ GET /api/users/username/:username
router.get('/username/:username', getUserByUsername);

router.get('/check', checkUsernameExists);

export default router;
