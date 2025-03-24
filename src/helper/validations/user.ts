import { check } from "express-validator";
import User from "../../models/user.model";
import { UserRole } from "../../interfaces/user.interface";

export const userLogin = [
  check("email")
    .exists({ values: "falsy" })
    .notEmpty()
    .bail()
    .withMessage("Email is required")
    .isEmail()
    .bail()
    .withMessage("Enter valid email"),
  check("password")
    .exists({ values: "falsy" })
    .notEmpty()
    .bail()
    .withMessage("Password is required"),
];

export const password = check("password")
  .exists()
  .bail()
  .withMessage("Password is required")
  .notEmpty()
  .bail()
  .withMessage("Password is required")
  .isStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  .bail()
  .withMessage("Enter strong password i.e. Abc@123");
export const createUser = [
    check("email")
      .exists()
      .notEmpty()
      .bail()
      .withMessage("Email is required")
      .isEmail()
      .bail()
      .withMessage("Enter valid email")
      .custom(async (value: string, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email already registered");
        }
        return true;
      }),
    password,
    check("role")
      .exists()
      .bail()
      .withMessage("Role is required")
      .notEmpty()
      .bail()
      .withMessage("Role is required")
      .isIn(Object.values(UserRole)),
  ];
  