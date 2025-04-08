export interface IUser {
  username: string;
  email: string;
  password: string;
  pokecoins: number;
  collection: {
    cardId: string;
    quantity: number;
    condition: string;
  }[];
}

  
