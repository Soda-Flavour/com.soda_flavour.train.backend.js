import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorMsg } from "../../constant/errorMsg";
import HttpException from "../../lib/HttpException";
import Jwt from "../../lib/Jwt";
import { isExistEmail, isExistNickname, createUser } from "./auth.queries";

class authController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { nick, email, password, confirmPassword } = req.body as {
        nick: string;
        email: string;
        password: string;
        confirmPassword: string;
      };

      if (password !== confirmPassword) {
        const err = new HttpException(403, errorMsg["E2104"], "E2104");
        throw err;
      }

      const reqParams = { email };
      const resultData = await isExistEmail(reqParams);

      if (resultData !== undefined) {
        const err = new HttpException(403, errorMsg["E2105"], "E2105");
        throw err;
      }

      const _reqParams = { nick };
      const _resultData = await isExistNickname(_reqParams);

      if (_resultData !== undefined) {
        const err = new HttpException(403, errorMsg["E2106"], "E2106");
        throw err;
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const userDataParams = {
        nick,
        email,
        password: hashedPassword,
      };

      const insertResult = await createUser(userDataParams);
      if (insertResult === false) {
        const err = new HttpException(403, errorMsg["E2107"], "E2107");
        throw err;
      }

      res.json({
        result: {
          status: 200,
          message: "회원가입에 성공했습니다.",
          data: {
            email: email,
          },
        },
      });
    } catch (error) {
      if (!(error instanceof HttpException)) {
        const _error = new HttpException(403, errorMsg["E2000"], "E2000");
        next(_error);
      }
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      const reqParams = { email };
      const resultData = await isExistEmail(reqParams);

      if (resultData === undefined) {
        const err = new HttpException(403, errorMsg["E2201"], "E2201");
        throw err;
      }
      console.log(resultData["password"]);
      const validPassword = await bcrypt.compare(
        password,
        resultData["password"]
      );
      if (!validPassword) {
        const err = new HttpException(403, errorMsg["E2202"], "E2202");
        res.status(403);
        throw err;
      }

      const payload = {
        id: resultData["id"],
        nick: resultData["nick"],
        email,
      } as {
        id: number;
        nick: string;
        email: string;
      };

      const access_t: string = await Jwt.sign(payload);
      const refresh_t: string = await Jwt.refresh(payload);

      res.json({
        result: {
          status: 200,
          message: "로그인에 성공했습니다.",
          data: {
            email: email,
            access_t,
            refresh_t,
          },
        },
      });
    } catch (error) {
      if (!(error instanceof HttpException)) {
        const _error = new HttpException(403, errorMsg["E2200"], "E2200");
        next(_error);
      }
      next(error);
    }
  }
}

export default authController;
