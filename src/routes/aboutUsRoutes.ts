import express from "express";
import { createAboutUs, getAboutUsByID, getAllAboutUs, updateAboutUsByID, deleteAboutUsByID } from "../controllers/aboutUsController";
import { securityToken } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AboutUs
 *   description: Manage AboutUs
 */

/**
 * @swagger
 * /aboutUs:
 *   post:
 *     summary: Add a AboutUs
 *     tags: [AboutUs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - aboutUsId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's ID
 *                 example: "660f12abc1234def56789abc"
 *               aboutUsId:
 *                 type: string
 *                 description: The ID of the about us to add
 *                 example: "xy7-54"
 *     responses:
 *       200:
 *         description: About us successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "About us added"
 *                 collection:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       aboutUsId:
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
router.post("/", securityToken, createAboutUs); 



// get AboutUs by ID
/**
 * @swagger
 * /aboutUs/{id}:
 *   get:
 *     summary: Get a single about us item by ID
 *     tags: [AboutUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the AboutUs item
 *     responses:
 *       200:
 *         description: A single AboutUs item
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
 *         description: AboutUs not found
 *       500:
 *         description: Error fetching AboutUs item
 */
router.get('/:id', getAboutUsByID);

/**
 * @swagger
 * /aboutUs:
 *   get:
 *     summary: Get all AboutUs
 *     tags: [AboutUs]
 *     responses:
 *       200:
 *         description: All AboutUs
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
 *                       aboutUsId:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       condition:
 *                         type: string
 *       404:
 *         description: AboutUs not found
 *       500:
 *         description: Error fetching collection
 */
router.get("/", getAllAboutUs);

/**
 * @swagger
 * /aboutUs/{id}:
 *   put:
 *     summary: Update a AboutUs
 *     tags: [AboutUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The AboutUs ID to update
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
 *         description: AboutUs updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AboutUs updated"
 *       404:
 *         description: User or AboutUs not found
 *       500:
 *         description: Server error
 */
router.put('/:id', securityToken, updateAboutUsByID);

/**
 * @swagger
 * /aboutUs/{id}:
 *   delete:
 *     summary: Remove a AboutUs
 *     tags: [AboutUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the AboutUs to remove
 *     responses:
 *       200:
 *         description: AboutUs successfully removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "AboutUs removed"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', securityToken, deleteAboutUsByID);


export default router;