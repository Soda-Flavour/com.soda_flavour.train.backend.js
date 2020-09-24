import express from "express";

// import { auth } from "./routes/auth/auth.routes";

class Routes {
  public router: express.Router = express.Router();

  constructor() {
    this.routerList();

    // switch (NODE_ENV) {
    //   case "production":
    //     this.basePath = "/app/dist";
    //     break;
    //   case "development":
    //     this.basePath = "/app/public";
    //     break;
    // }
  }

  private routerList(): void {
    this.router.get(`/`, (req: express.Request, res: express.Response) => {
      res.json({
        message: "하하하",
      });
    });
  }
}

export const router = new Routes().router;
