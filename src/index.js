import dotenv from "dotenv";
import { httpServer } from "./app.js";

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 3000;
const startServer = () => {
  httpServer.listen(PORT, () => {
    console.log("⚙️  Server is running on port: " + PORT);
  });
};

try {
  startServer();
} catch (err) {
  console.log("Something went wrong...");
}
