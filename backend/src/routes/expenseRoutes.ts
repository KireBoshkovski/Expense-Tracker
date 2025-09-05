import Router from "express";
import {
  createExpense,
  deleteExpense,
  getExpensesByUser,
  updateExpense,
  getExpenseById,
} from "../controller/expenseController";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, getExpensesByUser);
router.get("/:id", auth, getExpenseById);
router.post("/", auth, createExpense);
router.put("/:id", auth, updateExpense);
router.delete("/:id", auth, deleteExpense);

export default router;
