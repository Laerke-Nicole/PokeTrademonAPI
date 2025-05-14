import { IUserCard } from "../interfaces/User";

/**
 * Finds a card in a user's collection.
 */
export const findCard = (cards: IUserCard[], cardId: string): IUserCard | undefined => {
  return cards.find((card) => card.cardId === cardId);
};

/**
 * Transfers cards between users by adjusting quantities.
 * Adds new card entry if not present in receiver's collection.
 */
export const transferCard = (
  fromCollection: IUserCard[],
  toCollection: IUserCard[],
  cardId: string,
  quantity: number
): void => {
  const fromCard = findCard(fromCollection, cardId);
  if (fromCard) {
    fromCard.quantity -= quantity;
  }

  const toCard = findCard(toCollection, cardId);
  if (toCard) {
    toCard.quantity += quantity;
  } else {
    toCollection.push({ cardId, quantity, condition: "mint" });
  }
};
