import jwt from "jsonwebtoken";
require("dotenv").config();

class Jwt {
  static sign(payload: object): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        {
          expiresIn: "6h",
        },
        (error, token) => {
          if (error) return reject(error);
          return resolve(token);
        }
      );
    });
  }

  static refresh(payload: object): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        {
          expiresIn: "10h",
        },
        (error, token) => {
          if (error) return reject(error);
          return resolve(token);
        }
      );
    });
  }
}

export default Jwt;
