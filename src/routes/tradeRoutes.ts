import express from "express";
import {
  createTradeOffer,
  getTradeOffersForUser,
  acceptTradeOffer,
  declineTradeOffer,
} from "../controllers/tradeController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trades
 *   description: Trading endpoints
 */

/**
 * @swagger
 * /trades:
 *   post:
 *     summary: Create a new trade offer
 *     tags: [Trades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderId
 *               - receiverId
 *               - senderCards
 *               - receiverCards
 *             properties:
 *               senderId:
 *                 type: string
 *               receiverId:
 *                 type: string
 *               senderCards:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     cardId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               receiverCards:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     cardId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Trade created successfully
 */
router.post("/", createTradeOffer);

/**
 * @swagger
 * /trades/{userId}:
 *   get:
 *     summary: Get all trade offers involving a user
 *     tags: [Trades]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of trade offers
 */
router.get("/:userId", getTradeOffersForUser);

/**
 * @swagger
 * /trades/{tradeId}/accept:
 *   patch:
 *     summary: Accept a trade offer
 *     tags: [Trades]
 *     parameters:
 *       - in: path
 *         name: tradeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trade accepted successfully
 */
router.patch("/:tradeId/accept", acceptTradeOffer);

/**
 * @swagger
 * /trades/{tradeId}/decline:
 *   patch:
 *     summary: Decline a trade offer
 *     tags: [Trades]
 *     parameters:
 *       - in: path
 *         name: tradeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trade declined
 */
router.patch("/:tradeId/decline", declineTradeOffer);

export default router;
