import { Request, Response } from "express";
import { DI } from "../../app";
import { Game, User } from "../../entities";
import uuid4 from "uuid4";
import startGameRequestDto from "./dtos/startGameRequestDto";
import { GameType } from "../../entities/GameType";
//import joinGameRequestDto from "./dtos/joinGameRequestDto";

export class GameController {
  static getAllGames = async (req: Request, res: Response) => {
    const currentUser = req.user;

    const allGames = await DI.gameRepository.findAll({
      owner: currentUser,
    });

    return res.json({ allGames });
  };

  static createGame = async (req: Request, res: Response) => {
    const currentUser = req.user;

    const newGame = DI.em.create(Game, {
      type: "bataille-simple",
      code: uuid4(),
      owner: currentUser,
      players: [currentUser],
      status: "unstarted"
    });

    await DI.em.persistAndFlush(newGame);

    return res.json({ newGame });
  };


  static joinGame = async (req: Request, res: Response) => {
    const currentUser = req.user as User; // type correctly
    console.log("current");

    console.log(currentUser);


    const userEntity = await DI.userRepository.findOne({
      _id: currentUser._id
    })
    console.log("entity");

    console.log(userEntity);


    console.log(req.body);

    const game = await DI.gameRepository.findOne({

      code: req.body.gameCode
    })

    console.log(game);


    if (game && userEntity) {
      game.players = [...game.players, userEntity]
      await DI.em.persistAndFlush(game);
    } else {
      /// handle error
    }

    return res.json(game);

  }

  static startGame = async (req: Request<startGameRequestDto>, res: Response) => {
    const currentUser = req.user as User; // type correctly

    //Selectionne une game précise où userEntity/currentUser est le propriétaire
    // et sélectionne la game avec son code unique
    const game = await DI.gameRepository.findOne({
      owner: currentUser,
      code: req.body.gameCode
    })

    if (game && game?.owner?._id === currentUser._id && game.players.length >= 2) {
      game.status = GameType.STARTED;
      //generateDeck
      //distributeCards
      await DI.em.persistAndFlush(game);
    } else {
      return res.json("Joueurs insuffisants")
    }

    // if (game && userEntity) {
    //   game.players = [...game.players, userEntity]
    //   await DI.em.persistAndFlush(game);
    // } else {
    //   /// handle error
    // }

    return res.json(game);

  }


}
