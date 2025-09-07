import { log } from "console";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});
