import { Request, Response } from "express";
import { DI } from "../../app";
import { Game, Hand, User } from "../../entities";
import uuid4 from "uuid4";
import startGameRequestDto from "./dtos/startGameRequestDto";
import { GameType } from "../../entities/GameType";
import { CardDeck } from "../../services/CardDeck";
import { Card } from "../../services/CardInterface";
// import {Card} from "../../services/CardInterface";
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

    // console.log(currentUser);


    const userEntity = await DI.userRepository.findOne({
      _id: currentUser._id
    })
    // console.log("entity");

    // console.log(userEntity);


    // console.log(req.body);

    const game = await DI.gameRepository.findOne({

      code: req.body.gameCode
    })

    // console.log(game);


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

      const cardDeck = new CardDeck();
      const paquet = cardDeck.deck;
      const paquetMelange = cardDeck.shuffleDeck(paquet);

      // console.log(paquetMelange);

      // const cards : Card[] = [];


      //    Creation de mains
      const createHand = async (player: User, game: Game, cards: Card[]) => {
        const newHand = DI.em.create(Hand, {
          cards: cards,
          owner: player,
          game: game,

        });

        await DI.em.persistAndFlush(newHand);

        console.log({ newHand });

      };


      // creation de main pour chaque joueur
      const createHandForAllPlayers = (players: User[], game: Game) => {
        const nbDeCarteParJoueur = paquet.length / players.length;
        for (let j = 0; j < players.length; j++) {
          let paquetJoueur: Card[] = [];
          for (let i = 0; i < nbDeCarteParJoueur - 1; i++) {
            const carte = paquetMelange.pop();
            console.log(carte);

            // paquetJoueur.push(carte);
          }

          createHand(players[j], game, paquetJoueur); //paquet -> liste de carte
        }

      }

      createHandForAllPlayers(game.players, game);
      // console.log(game.players[0].email);

      //   const cardsPerPlayer = Math.floor(deck.length / players.length);
      //   players.forEach(player => {
      //       for (let i = 0; i < cardsPerPlayer; i++) {
      //           player.addCard(deck.pop());
      //       }
      //   });

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
