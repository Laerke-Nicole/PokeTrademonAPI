import express from "express";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: Card collections for users
 */

/**
 * @swagger
 * /collections:
 *   get:
 *     summary: Test route for collection
 *     tags: [Collections]
 *     responses:
 *       200:
 *         description: Returns a success message
 */
router.get("/", (req, res) => {
  res.json({ message: "Collection routes are working!" });
});

export default router;
