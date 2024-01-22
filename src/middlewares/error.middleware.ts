import mongoose from "mongoose";
import {Request,Response,NextFunction} from 'express'
import { ApiError } from "../utils/ApiError";
const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || []);
  }
  const response = {
    ...error,
    message: error.message,
  };

  return res.status(error.statusCode).json(response);
};

export { errorHandler };