import BaseError from "../errors/BaseError";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err);
  }
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({ message: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}
