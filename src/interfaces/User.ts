export interface IUser {
  username: string;
  email: string;
  password: string;
  pokecoins: number;
  cardCollection: {
    cardId: string;
    quantity: number;
    condition: string;
  }[];
}

  
