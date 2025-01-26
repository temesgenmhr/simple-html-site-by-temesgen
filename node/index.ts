import express from "express";
import cors from "cors";
import { getCommentsController } from "./controller";
import { corsMiddleware } from "./middleware";
const app = express();

// Use the CORS middleware
app.use(corsMiddleware);

// Define the route for the root URL
app.get("/", getCommentsController);

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
