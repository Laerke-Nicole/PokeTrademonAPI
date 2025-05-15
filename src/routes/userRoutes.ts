import express from 'express';
import { getUserByUsername, checkUsernameExists, updateUserProfile, deleteUser } from '../controllers/userController';
import { securityToken } from '../middleware/authMiddleware';


const router = express.Router();

// ✅ GET /api/users/username/:username
router.get('/username/:username', getUserByUsername);
router.patch('/update', securityToken, updateUserProfile);
router.delete("/delete", securityToken, deleteUser);
router.get('/check', checkUsernameExists);

export default router;
