export interface IUserCard {
  cardId: string;
  quantity: number;
  condition: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  pokecoins: number;
  cardCollection: IUserCard[];
}

// ✅ Use this for JWT only
export interface IUserPayload {
  _id: string;
  username: string;
  email: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegistration extends IUser {}
