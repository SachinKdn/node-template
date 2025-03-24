import mongoose, { Schema, Document } from "mongoose";
import { IUser, UserRole } from "../interfaces/user.interface";
import { hashPassword } from "../services/user.service";
import { BaseSchema } from "../helper/response";


// Extend Document with IUser interface to combine both
// export interface IUserDocument extends Omit<IUser, '_id'>, Document {
//     _id: string;
// }
// export interface IUserDocument extends IUser, BaseSchema {};

  const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: Object.values(UserRole), // Use the enum for role validation
            default: UserRole.USER,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// // Hash the password before saving the user document
// UserSchema.pre<IUserDocument>("save", async function (next) {
//     if (this.isModified("password")) {
//         this.password = await hashPassword(this.password);
//     }
//     next();
// });
UserSchema.pre("save", async function (next) {
    if (this.password) {
      this.password = await hashPassword(this.password);
    }
    next();
  });


// Export the Mongoose model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
