import express from "express";
import { getNotifications, markAsRead, getUnreadCount, markAllAsRead } from "../controllers/notificationController";
import { securityToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", securityToken, getNotifications);
router.patch("/:id/read", securityToken, markAsRead);
router.get("/unread-count", getUnreadCount);
router.patch("/mark-all-read", markAllAsRead);
export default router;
