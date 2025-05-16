import express from "express";
import { createNews, getNewsByID, getAllNews, updateNewsByID, deleteNewsByID } from "../controllers/newsController";
import { securityToken } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Manage news
 */

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Add a news
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - newsId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's ID
 *                 example: "660f12abc1234def56789abc"
 *               newsId:
 *                 type: string
 *                 description: The ID of the news to add
 *                 example: "xy7-54"
 *     responses:
 *       200:
 *         description: News successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "News added"
 *                 collection:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       newsId:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       condition:
 *                         type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/", securityToken, createNews); 



// get news by ID
/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get a single news item by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the news item
 *     responses:
 *       200:
 *         description: A single news item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 subTitle:
 *                   type: string
 *                 text:
 *                   type: string
 *                 imageURL:
 *                   type: string
 *                 isHidden:
 *                   type: boolean
 *       404:
 *         description: News not found
 *       500:
 *         description: Error fetching news item
 */
router.get('/:id', getNewsByID);

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get all news
 *     tags: [News]
 *     responses:
 *       200:
 *         description: All news
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 collection:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       newsId:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       condition:
 *                         type: string
 *       404:
 *         description: News not found
 *       500:
 *         description: Error fetching collection
 */
router.get("/", getAllNews);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update a news
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The news ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 2
 *               condition:
 *                 type: string
 *                 example: "used"
 *     responses:
 *       200:
 *         description: News updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "News updated"
 *       404:
 *         description: User or news not found
 *       500:
 *         description: Server error
 */
router.put('/:id', securityToken, updateNewsByID);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Remove a news
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the news to remove
 *     responses:
 *       200:
 *         description: News successfully removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "News removed"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', securityToken, deleteNewsByID);


export default router;