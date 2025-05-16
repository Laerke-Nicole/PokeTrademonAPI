import { Request, Response } from "express";
import { getAllPokemonCards, getPokemonCardById } from "../utils/pokemonService";

export const fetchAllCards = async (req: Request, res: Response) => {
  try {
    const { q = "", page = "1", pageSize = "20" } = req.query;
    const cards = await getAllPokemonCards(
      q.toString(),
      parseInt(page.toString(), 10),
      parseInt(pageSize.toString(), 10)
    );
    res.json({
      data: cards.data,
      totalCount: cards.totalCount
    });
    
      } catch (error) {
    res.status(500).json({
      message: "Error fetching Pokémon cards",
      error: (error as Error).message,
    });
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
