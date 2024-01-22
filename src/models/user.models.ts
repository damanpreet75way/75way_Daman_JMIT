import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { UserRolesEnum, AvailableUserRoles } from "../constants";
import mongoose, { Schema ,Model} from "mongoose";
import { User } from "../core/types";


interface IUserMethods {
  generateAccessToken(): string;
  generateRefreshToken():string;
  isPasswordCorrect(password:string):boolean
}

type UserModel = Model<User, {}, IUserMethods>;


const userSchema = new Schema<User,UserModel,IUserMethods>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.method("isPasswordCorrect", async function (password: string) {
  return await bcrypt.compare(password, this.password);
})


userSchema.method("generateAccessToken", function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET || "",
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
});



userSchema.method("generateRefreshToken", function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET || "",
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
}
)
export const UserModel = mongoose.model<User, UserModel>("User", userSchema);
