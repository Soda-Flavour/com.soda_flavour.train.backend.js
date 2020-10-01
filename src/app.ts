import express, { Application } from "express";
import morgan from "morgan";
import compression = require("compression");
import helmet from "helmet";
import cors = require("cors");

import { router } from "./api/routes/router";
import { notFound } from "./api/middleware/notFound";
import { errorHandler } from "./api/middleware/errorHandler";
// import rateLimit from "express-rate-limit";

export class App {
  protected app: Application;
  protected node_env: string;
  protected port: string;

  constructor(NODE_ENV = "development", PORT = "3000") {
    this.node_env = process.env.NODE_ENV || NODE_ENV;
    this.port = process.env.PORT || PORT;

    this.app = express();
    this.app.use(helmet());
    this.app.use(express.json());

    if (NODE_ENV === "development") {
      // this.app.use(express.static(path.join(process.cwd(), "public")));
      // this.app.use(
      //   "/bower_components",
      //   express.static(path.join(process.cwd(), "bower_components"))
      // ); // set the static files location of bower_components
      this.app.use(morgan("dev")); // log every request to the console
    } else {
      this.app.use(compression());
      // this.app.use(
      //   express.static(path.join(process.cwd(), "dist"), { maxAge: "7d" })
      // ); // set the static files location /public/img will be /img for users
    }

    this.config();
  }

  private config(): void {
    // this.setDatabase();
    this.setParsers(false);
    this.setCors();
    this.setRouting();
    this.runServer();
  }

  private setParsers(useNestedObjects: boolean): void {
    // support application/json
    this.app.use(express.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(express.urlencoded({ extended: useNestedObjects }));
  }

  private setCors(): void {
    this.app.use(
      cors({
        origin: function (origin, callback) {
          callback(null, true);
        },
        credentials: true,
      })
    );
  }

  private setRouting(): void {
    this.app.use("/api/v1", router);
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  private runServer(): void {
    this.app.listen(this.port, () => console.log("run"));
  }
}
