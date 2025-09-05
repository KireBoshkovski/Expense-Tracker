import express from "express";
import expenseRoutes from "./routes/expenseRoutes";
import connectDB from "./config/db";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use("/api/expenses", expenseRoutes);

connectDB();

export default app;
