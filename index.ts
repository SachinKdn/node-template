import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { loadConfig } from "./src/config/config";
import router from "./src/routes/routes";
import { initDB } from "./src/config/initDB";
import errorHandler from "./src/middlewares/errorHandler";
import { IUser } from "./src/interfaces/user.interface";
import { initPassport } from "./src/services/passport-jwt";
import passport from "passport";

// Declare global types for Express
declare global {
    namespace Express {
      interface User extends Omit<IUser, "password"> {}
      interface Request {
        user?: User;
      }
    }
}

// Load configuration
loadConfig();

// Initialize Database and Passport
initDB();
initPassport();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(passport.initialize());
app.use(cors());  // Enable CORS
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Logging requests

// Health Check Route (Should be before any complex routes)
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome Boss!!");
});

// API Routes (Handle actual API requests)
app.use("/api", router);

// Error Handling (Should be after routes to catch any errors)
app.use(errorHandler);

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
