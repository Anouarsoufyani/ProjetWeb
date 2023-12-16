import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import { Game, User, Hand } from "./entities";
import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from "@mikro-orm/core";

import passport from "passport";
import { applyPassportConfig } from "./config/passport";

import authRoutes from "./routes/auth";
import gameRoutes from "./routes/game";

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
  gameRepository: EntityRepository<Game>;
  handRepository: EntityRepository<Hand>
};

const app = express();

(async () => {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.gameRepository = DI.orm.em.getRepository(Game);
  DI.handRepository = DI.orm.em.getRepository(Hand);

  dotenv.config({ path: "./config/local.env" });

  app.use(passport.initialize());
  app.use(cors());
  app.use(express.json());

  // Passport Config
  applyPassportConfig(passport);

  if (process.env.ENVIRONEMENT === "dev") {
    app.use(morgan("dev"));
  }

  app.use((_req, _res, next) => RequestContext.create(DI.orm.em, next));

  app.use("/auth", authRoutes);
  app.use("/game", gameRoutes);
  app.use((_req, res) => res.status(404).json({ error: "No route found" }));
})();

export default app;
