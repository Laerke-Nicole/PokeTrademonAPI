// import { findCard, transferCard } from "../utils/tradeUtils";
// import { IUserCard } from "../interfaces/User";

// describe("tradeUtils", () => {
//   describe("findCard", () => {
//     it("should find a card by cardId", () => {
//       const cards: IUserCard[] = [
//         { cardId: "abc", quantity: 2, condition: "mint" },
//         { cardId: "xyz", quantity: 1, condition: "used" },
//       ];

//       const result = findCard(cards, "xyz");
//       expect(result).toEqual({ cardId: "xyz", quantity: 1, condition: "used" });
//     });

//     it("should return undefined for missing card", () => {
//       const cards: IUserCard[] = [];
//       expect(findCard(cards, "not-there")).toBeUndefined();
//     });
//   });

//   describe("transferCard", () => {
//     it("should move cards between collections and update quantity", () => {
//       const from: IUserCard[] = [{ cardId: "123", quantity: 2, condition: "mint" }];
//       const to: IUserCard[] = [];

//       transferCard(from, to, "123", 1);

//       expect(from[0].quantity).toBe(1);
//       expect(to[0]).toEqual({ cardId: "123", quantity: 1, condition: "mint" });
//     });

//     it("should increase quantity if card exists in both collections", () => {
//       const from: IUserCard[] = [{ cardId: "fire", quantity: 3, condition: "used" }];
//       const to: IUserCard[] = [{ cardId: "fire", quantity: 2, condition: "used" }];

//       transferCard(from, to, "fire", 2);

//       expect(from[0].quantity).toBe(1);
//       expect(to[0].quantity).toBe(4);
//     });
//   });
// });
