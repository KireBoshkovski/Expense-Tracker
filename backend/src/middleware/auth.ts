import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  principal?: { id: string };
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });

    // Cast and runtime check
    const payload = decoded as TokenPayload;
    if (!payload.id)
      return res.status(403).json({ error: "Invalid token payload" });

    req.principal = { id: payload.id };
    next();
  });
};
