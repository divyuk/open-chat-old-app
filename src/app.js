import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/error.middlewares.js";

import userRouter from "./routes/apps/auth/user.routes.js";

const app = express();
// Middleware to parse JSON request body
app.use(express.json());

// Middleware to parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));
const httpServer = createServer(app);
const io = new Server(httpServer, {});

// app.get("/", (req, res) => {
//   res.json("Homepage");
// });

io.on("connection", (socket) => {
  console.log("A user is connected.!");
});

// App routes
app.use("/api/v1/users", userRouter);

//Global Error Handler Middleware
app.use(errorHandler);

export { httpServer };
