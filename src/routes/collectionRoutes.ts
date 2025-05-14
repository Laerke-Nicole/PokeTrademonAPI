import express from "express";
import { securityToken } from "../middleware/authMiddleware";
import { addCardToCollection, getUserCollection, updateCardInCollection, deleteCardFromCollection } from "../controllers/collectionController";

const router = express.Router();

// ✅ Protect all /collections routes
router.use(securityToken);

/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: Manage user's card collections
 */

/**
 * @swagger
 * /collections:
 *   post:
 *     summary: Add a card to the user's collection
 *     tags: [Collections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - cardId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's ID
 *                 example: "660f12abc1234def56789abc"
 *               cardId:
 *                 type: string
 *                 description: The ID of the card to add
 *                 example: "xy7-54"
 *     responses:
 *       200:
 *         description: Card successfully added to the collection
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Card added to collection"
 *                 collection:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       cardId:
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
router.post("/", addCardToCollection); 

/**
 * @swagger
 * /collections/{userId}:
 *   get:
 *     summary: Get a user's full collection
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: The user's card collection
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
 *                       cardId:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       condition:
 *                         type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Error fetching collection
 */
router.get("/:userId", getUserCollection);

/**
 * @swagger
 * /collections/{userId}/{cardId}:
 *   patch:
 *     summary: Update a card in the user's collection
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The card ID to update
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
 *         description: Card updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Card updated in collection"
 *       404:
 *         description: User or card not found
 *       500:
 *         description: Server error
 */
router.patch("/:userId/:cardId", updateCardInCollection);

/**
 * @swagger
 * /collections/{userId}/{cardId}:
 *   delete:
 *     summary: Remove a card from the user's collection
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the card to remove
 *     responses:
 *       200:
 *         description: Card successfully removed from the collection
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Card removed from collection"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:userId/:cardId", deleteCardFromCollection);


export default router;
