import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import createHttpError from "http-errors";
import { createResponse } from "../helper/response";
import { createUserTokens } from "../services/passport-jwt";
import { IUser } from "../interfaces/user.interface";

export const createUser = async (req: Request, res: Response): Promise<void> => {
        console.log(req.body)
        const user = await userService.createUser(req.body);
        // res.status(201).json(user);
        console.log("\n\n\n user--- inside controller", user);
        const tokens = createUserTokens(user.toObject());
        res.send(
        createResponse({
            ...tokens,
            user,
        })
        );
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            throw createHttpError(400, {
                message: "User not found"
            });
        }
        res.json({ success: true, data: user });
    
};

export const getMyProfile = async (req: Request, res: Response) =>{
    console.log("req");
    // const user = await User.findById(req.user?._id).select("-password");
    // res.send(createResponse(user, "User details feteched successfully!"));
    console.log("getMyProfile")
    console.log(req.user)
    const user: IUser | null = await userService.getUserById(req.user?._id!);
    if (!user) {
        throw createHttpError(400, {
            message: "User profile not found"
        });
    }
    res.send(
        createResponse({
            user,
        })
        );
}

export const loginUser = async (req: Request, res: Response) : Promise<void> => {
        console.log("Login Request Occured in users.ts.")
      console.log(req.user);
      res.send(
        createResponse({ ...createUserTokens(req.user!), user: req.user })
      );
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await userService.deleteUser(req.params.id);
        if (!result) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
};



