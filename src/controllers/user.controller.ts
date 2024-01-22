import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { UserRolesEnum } from "../constants";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (
  userId: mongoose.Types.ObjectId
) => {
  try {
    const user = await UserModel.findById(userId);

    const accessToken = user!.generateAccessToken();
    const refreshToken = user!.generateRefreshToken();

    user!.refreshToken = refreshToken;
    await user!.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating the access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;

  const existedUser = await UserModel.findOne({
    $or: [{ username }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exist");
  }
  const user = await UserModel.create({
    username,
    password,
    role: role || UserRolesEnum.USER,
  });

  await user.save();
  const createdUser = await UserModel.findById(user._id).select(
    "-password -refreshToken"
  );
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "Users registered successfully "
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(400, "Username is required");
  }

  const user = await UserModel.findOne({
    $or: [{ username }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await UserModel.findById(user._id).select(
    "-password -refreshToken "
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

export { registerUser };
