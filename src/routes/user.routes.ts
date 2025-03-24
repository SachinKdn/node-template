import { Router } from "express";
import { createUser, getUser, updateUser, deleteUser, loginUser, getMyProfile } from "../controllers/user.controller";
import { catchError, validate } from "../middlewares/validation";

import expressAsyncHandler from "express-async-handler";
import passport from "passport";



const router = Router();

// Create a new user
router.post("/", validate("users:create"), catchError, expressAsyncHandler(createUser));

// Get a user by ID
// router.get("/:id", expressAsyncHandler(getUser));

// Get my profile
router.get("/me",
passport.authenticate("jwt", { session: false }),
expressAsyncHandler(getMyProfile))

// Update a user by ID
// router.put("/:id", updateUser);

// // Delete a user by ID
// router.delete("/:id", deleteUser);


// Login user
router.post(
    "/login",
    validate("users:login"),
    catchError,
    passport.authenticate("login", { session: false }),
    expressAsyncHandler(loginUser)
  );

export default router;
