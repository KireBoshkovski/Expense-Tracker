import { Router } from "express";
import {
  Login,
  Register,
  Logout,
  RefreshToken,
} from "../controller/authController";

const router = Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", Logout);
router.post("/refresh-token", RefreshToken);

export default router;
