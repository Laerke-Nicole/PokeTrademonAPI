import axios from "axios";

const POKEMON_TCG_API_URL = "https://api.pokemontcg.io/v2/cards";

export const getAllPokemonCards = async (
  q: string = "",
  page: number = 1,
  pageSize: number = 20
) => {
  try {
    const API_KEY = process.env.POKEMON_TCG_API_KEY || "";
    console.log("🔑 Using API key:", API_KEY); // Double-check here

    const response = await axios.get(POKEMON_TCG_API_URL, {
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
  } catch (error: any) {
    console.error("❌ Error fetching Pokémon cards:", error?.response?.data || error.message);
    throw new Error("Failed to fetch Pokémon cards.");
  }
};



export const getPokemonCardById = async (cardId: string) => {
  try {
    const API_KEY = process.env.POKEMON_TCG_API_KEY || "";
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
