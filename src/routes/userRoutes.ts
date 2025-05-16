import express from 'express';
import { getUserByUsername, checkUsernameExists, updateUserProfile, deleteUser, getCurrentUser } from '../controllers/userController';
import { securityToken } from '../middleware/authMiddleware';


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User account management
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get the currently authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The current user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60f7b8b3e1a4a31234567890
 *                 username:
 *                   type: string
 *                   example: valion
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/me', securityToken, getCurrentUser);

/**
 * @swagger
 * /users/update:
 *   patch:
 *     summary: Update the current user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.patch('/update', securityToken, updateUserProfile);

/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Delete the currently authenticated user's account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete('/delete', securityToken, deleteUser);

/**
 * @swagger
 * /users/username/{username}:
 *   get:
 *     summary: Get user by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username to look up
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/username/:username', getUserByUsername);

/**
 * @swagger
 * /users/check:
 *   get:
 *     summary: Check if a username exists
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username to check
 *     responses:
 *       200:
 *         description: Result of check
 */
router.get('/check', checkUsernameExists);


export default router;
