import { Response } from "express";
import { AuthRequest } from "../interfaces/AuthRequest";
import NotificationModel from "../models/NotificationModel";

export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const notifications = await NotificationModel.find({ userId: req.user?._id, isRead: false });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const notification = await NotificationModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?._id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      res.status(404).json({ message: "Notification not found" });
      return;
    }

    res.status(200).json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update notification" });
  }
};

export const getUnreadCount = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const count = await NotificationModel.countDocuments({ userId: req.user?._id, isRead: false });
      res.status(200).json({ unreadCount: count });
    } catch (err) {
      res.status(500).json({ message: "Failed to count unread notifications" });
    }
  };

  
  export const markAllAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const result = await NotificationModel.updateMany(
        { userId: req.user?._id, isRead: false },
        { $set: { isRead: true } }
      );      
  
      res.status(200).json({
        message: `Marked ${result.modifiedCount} notifications as read`,
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  };
  
