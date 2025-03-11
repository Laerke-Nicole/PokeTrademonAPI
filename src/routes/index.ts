import { Router, Request, Response } from "express";
import authRoutes from "./authRoutes";
import pokemonRoutes from "./pokemonRoutes";
import collectionRoutes from "./collectionRoutes";
import tradeRoutes from "./tradeRoutes";

const router: Router = Router();

/**
 * ✅ Health Check Route (Like Your Old API)
 */
router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to the Pokémon Trading API!");
});

/**
 * ✅ Register all sub-routes under `/api`
 */
router.use("/auth", authRoutes);
router.use("/pokemon", pokemonRoutes);
router.use("/collections", collectionRoutes);
router.use("/trades", tradeRoutes);

export default router;
