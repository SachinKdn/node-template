 // Assuming a Mongoose model is defined in models/User.ts
 const bcrypt = require("bcryptjs")
 import { IUser } from "../interfaces/user.interface"; // Optional: Define a user interface for TypeScript
import User from "../models/user.model";

export const getUserByEmail = async (email: string) => {
    console.log("finding user by mail")
    const user = await User.findOne({ email: email }).lean();//This method returns a plain JavaScript object instead of a Mongoose document, which can be useful for querying and returning data in a more lightweight and efficient manner.
    return user;
  };

export const createUser = async (userData: IUser) => {
    const user = await User.create(userData);
    console.log("\n\n\n createUser------>", user);
  return user;
};

export const getUserById = async (id: string): Promise<IUser | null> => {
    const user = await User.findById(id);
    console.log("getUserById------>", user)
    return user;
};

export const updateUser = async (id: string, userData: Partial<IUser>): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUser = async (id: string): Promise<boolean> => {
    const result = await User.findByIdAndDelete(id);
    return !!result;
};

export const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  };