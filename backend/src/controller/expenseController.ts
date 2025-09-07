import { Response } from "express";
import Expense from "../models/Expense";
import { AuthRequest } from "../middleware/auth";
import { error } from "console";

export const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { title, amount, category, date } = req.body;
    const user = req.principal!.id;
    const expense = new Expense({ title, amount, category, date, user });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getExpensesByUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.principal!.id;
    const expenses = await Expense.find({ user: userId });
    res.json(expenses);
  } catch (err) {
    res.status(400).json({ error: error });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.principal!.id;
    const { id } = req.params;
    const { title, amount, category } = req.body.expense;
    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: userId },
      { title, amount, category },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ error: "Expense not found or not yours" });
    }

    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.principal!.id;
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found or not yours" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

export const getExpenseById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.principal!.id;
    const { id } = req.params;

    const expense = await Expense.findOne({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found or not yours" });
    }

    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};
