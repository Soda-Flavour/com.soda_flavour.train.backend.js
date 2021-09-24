import * as express from "express";

const notFound = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const error = new Error(`Not found - ${req.originalUrl}하하하`);
  res.status(404);
  next(error);
};

export { notFound };
