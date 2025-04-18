import axios from "axios";

const POKEMON_TCG_API_URL = "https://api.pokemontcg.io/v2/cards";
const API_KEY = process.env.POKEMON_TCG_API_KEY || ""; // Set API key in .env

export const getAllPokemonCards = async (
  q: string = "",
  page: number = 1,
  pageSize: number = 20
) => {
  try {
    const response = await axios.get("https://api.pokemontcg.io/v2/cards", {
      headers: {
        "X-Api-Key": API_KEY,
      },
      params: {
        q,
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon cards:", error);
    throw new Error("Failed to fetch Pokémon cards.");
  }
};


export const getPokemonCardById = async (cardId: string) => {
  try {
    const response = await axios.get(`${POKEMON_TCG_API_URL}/${cardId}`, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokémon card with ID ${cardId}:`, error);
    throw new Error("Failed to fetch Pokémon card.");
  }
};
