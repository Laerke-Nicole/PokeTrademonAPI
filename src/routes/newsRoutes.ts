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


// add news
/**
 * @swagger
 * /news:
 *   post:
 *     summary: Add a news item
 *     tags: [News]
 *     security:
 *       - auth-token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Breaking News"
 *               subTitle:
 *                 type: string
 *                 example: "This just in..."
 *               text:
 *                 type: string
 *                 example: "Detailed news content goes here."
 *               imageURL:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               date:
 *                 type: string
 *                 example: "2025-05-18"
 *               theme:
 *                 type: string
 *                 example: "Politics"
 *               isHidden:
 *                 type: boolean
 *                 example: false
 *               userId:
 *                 type: string
 *                 example: "660f12abc1234def56789abc"
 *     responses:
 *       200:
 *         description: News successfully added
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
 *                 date:
 *                   type: string
 *                 theme:   
 *                  type: string
 *                 isHidden:
 *                   type: boolean
 *       404:
 *         description: News not found
 *       500:
 *         description: Error fetching news item
 */
router.get('/:id', getNewsByID);


// get all news
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
 *                 news:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       subTitle:
 *                         type: string
 *                       text:
 *                         type: string
 *                       imageURL:
 *                         type: string
 *                       date:
 *                         type: string
 *                       theme:
 *                         type: string
 *                       isHidden:
 *                         type: boolean
 *                       userId:
 *                         type: string
 *       404:
 *         description: News not found
 *       500:
 *         description: Error fetching collection
 */
router.get("/", getAllNews);


// update news by ID
/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update a news item
 *     tags: [News]
 *     security:
 *       - auth-token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the news to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subTitle:
 *                 type: string
 *               text:
 *                 type: string
 *               imageURL:
 *                 type: string
 *               date:
 *                 type: string
 *               theme:
 *                 type: string
 *               isHidden:
 *                 type: boolean
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: News updated successfully
 *       404:
 *         description: News not found
 *       500:
 *         description: Server error
 */
router.put('/:id', securityToken, updateNewsByID);


// delete news by ID
/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Remove a news
 *     tags: [News]
 *     security:
 *       - auth-token: []
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