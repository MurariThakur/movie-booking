import { clerkClient } from "@clerk/express";

export const protectAdmin = (req, res, next) => {
  try {
    const { userId } = req.auth;

    const user = clerkClient.users.getUser(userId);
    if (user.publicMetadata.role !== "admin") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
