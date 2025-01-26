import cors from "cors";

// CORS middleware configuration, allow only requests from localhost:3000 for frontend
const corsOptions = {
  origin: "http://localhost:3000",
};
// Export the middleware function
export const corsMiddleware = cors(corsOptions);
