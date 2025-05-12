import express from "express";
import { fetchAllCards, fetchCardById } from "../controllers/pokemonController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pokémon
 *   description: Fetching Pokémon card data
 */

/**
 * @swagger
 * /pokemon/cards:
 *   get:
 *     summary: Get all Pokémon cards
 *     tags: [Pokémon]
 *     responses:
 *       200:
 *         description: List of all cards
 */
router.get("/cards", fetchAllCards);

/**
 * @swagger
 * /pokemon/cards/{id}:
 *   get:
 *     summary: Get a single Pokémon card by ID
 *     tags: [Pokémon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pokémon card data
 */
router.get("/cards/:id", fetchCardById);

export default router;
