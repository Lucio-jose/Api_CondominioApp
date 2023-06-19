/* eslint-disable import/order */

import cors from "cors";
import express from "express";
import "express-async-errors";
import path from "path";
import Youch from "youch";
import * as Sentry from "@sentry/node";
import routes from "./routes";
import "./database";
import sentryConfig from "./config/sentry";

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "temp", "upload"))
    );
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.json());
    this.server.use(
      cors({
        origin: "http://localhost:3000",
      })
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, nex) => {
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors) 
    });
  }
}
export default new App().server;
