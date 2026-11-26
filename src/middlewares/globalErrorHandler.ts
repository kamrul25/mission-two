import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log({ err });

  let statusCode = err.statusCode ?? 500;
  let message = err.message || "Internal Server Error";
  let errDetails = err;

  if (err.code === "23505") {
    message = "please change your ISBN number";
  }

  res.status(statusCode).send({
    message,
    error: errDetails,
  });
};

export default globalErrorHandler;