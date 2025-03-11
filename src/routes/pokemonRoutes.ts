import express from "express";
import { fetchAllCards, fetchCardById } from "../controllers/pokemonController";

const router = express.Router();

router.get("/cards", fetchAllCards);
router.get("/cards/:id", fetchCardById);

export default router;
