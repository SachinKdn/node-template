import { Document } from "mongoose";
import { BaseSchema } from "../helper/response";

// Enum for User Roles
export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
}

export interface IUser extends BaseSchema {
    name: string;
    email: string;
    isActive: boolean;
    password: string;
    role: UserRole;
  }
  