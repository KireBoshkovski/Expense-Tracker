import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/auth", authRoutes);

connectDB();

export default app;
