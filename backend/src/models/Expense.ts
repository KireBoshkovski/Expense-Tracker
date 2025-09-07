import { Schema, model, Document } from "mongoose";

interface IExpense extends Document {
  title: string;
  amount: number;
  category: string;
  date: Date;
  user: Schema.Types.ObjectId;
}

const ExpenseSchema = new Schema<IExpense>({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model<IExpense>("Expense", ExpenseSchema);
