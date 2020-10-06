import { Router } from "express";
import authController from "./auth.controller";
import { joinValidateMiddleware } from "./auth.validate";

const AuthContr = new authController();

const authRouter = Router();

authRouter.post(`/join`, joinValidateMiddleware, AuthContr.create);

export default authRouter;
