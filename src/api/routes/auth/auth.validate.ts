import express from "express";
import Joi from "joi";
import HttpException from "../../lib/HttpException";
import { errorMsg } from "../../constant/errorMsg";

export const joinValidateMiddleware = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const joinSchemaValidate = Joi.object().keys({
    nick: Joi.string().min(4).max(10).trim().required().label("E2100"),
    email: Joi.string().email().required().trim().label("E2101"),
    password: Joi.string()
      .min(8)
      .max(18)
      .regex(/[$&+,:;=?@#|'<>.^*()%!-]/)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .required()
      .label("E2102"),
    confirmPassword: Joi.string()
      .min(8)
      .max(18)
      .regex(/[$&+,:;=?@#|'<>.^*()%!-]/)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .required()
      .label("E2103"),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const { error, value } = joinSchemaValidate.validate(req.body, options);

  if (error) {
    const errCode = error?.details[0].context?.label || "E1111";
    const err = new HttpException(433, errorMsg[errCode], errCode);
    next(err);
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
};

export const loginValidateMiddleware = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const joinSchemaValidate = Joi.object().keys({
    email: Joi.string().email().required().trim().label("E2101"),
    password: Joi.string()
      .min(8)
      .max(18)
      .regex(/[$&+,:;=?@#|'<>.^*()%!-]/)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .required()
      .label("E2102"),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const { error, value } = joinSchemaValidate.validate(req.body, options);

  if (error) {
    const errCode = error?.details[0].context?.label || "E1111";
    const err = new HttpException(433, errorMsg[errCode], errCode);
    next(err);
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
};
