import * as express from "express";
import HttpException from "../lib/HttpException";

const errorHandler = (
  error: HttpException,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const statusCode = res.statusCode === 200 ? error.status : res.statusCode;
  const stack = process.env.NODE_ENV == "production" ? "Hi" : error.stack;

  res.status(statusCode);

  res.json({
    result: {
      status: statusCode,
      message: error.message,
      stack: stack,
      errorCode: error.errorCode,
      // error: error.errors || undefined,
    },
  });

  // const error = new Error(`Not found - ${req.originalUrl}하하하`);
  // res.status(404);
};

export { errorHandler };
