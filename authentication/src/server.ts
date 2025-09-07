import { log } from "console";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  log(`Authentication Server running on port ${PORT}`);
});
