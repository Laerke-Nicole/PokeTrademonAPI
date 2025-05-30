import { Router, Request, Response } from "express";
import authRoutes from "./authRoutes";
import pokemonRoutes from "./pokemonRoutes";
import collectionRoutes from "./collectionRoutes";
import tradeRoutes from "./tradeRoutes";
import userRoutes from "./userRoutes";
import newsRoutes from "./newsRoutes";
import AboutRoutes from "./aboutUsRoutes";
import notificationRoutes from './notificationRoutes';

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
router.use("/users", userRoutes);
router.use("/pokemon", pokemonRoutes);
router.use("/collections", collectionRoutes);
router.use("/trades", tradeRoutes);
router.use("/news", newsRoutes);
router.use("/notifications", notificationRoutes);
router.use("/aboutUs", AboutRoutes);



export default router;
