import express from 'express';
import { getUserByUsername } from '../controllers/userController';

const router = express.Router();

// ✅ GET /api/users/username/:username
router.get('/username/:username', getUserByUsername);

export default router;
