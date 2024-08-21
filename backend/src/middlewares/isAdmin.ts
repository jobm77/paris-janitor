import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "./auth";

export const isAdmin = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Seuls les administrateurs peuvent accéder à cette ressource." });
  }
  next();
};
