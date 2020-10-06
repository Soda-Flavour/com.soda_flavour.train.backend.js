import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { errorMsg } from "../../constant/errorMsg";
import HttpException from "../../lib/HttpException";
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
}

export default authController;
