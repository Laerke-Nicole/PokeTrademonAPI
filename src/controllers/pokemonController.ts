import { Request, Response } from "express";
import { getAllPokemonCards, getPokemonCardById } from "../utils/pokemonService";

export const fetchAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await getAllPokemonCards();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Pokémon cards", error });
  }
};

export const fetchCardById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const card = await getPokemonCardById(id);
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Pokémon card", error });
  }
};
