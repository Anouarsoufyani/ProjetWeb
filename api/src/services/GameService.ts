import { DI } from "../app";
import { Game, Hand, User } from "../entities";
import { GameType } from "../entities/GameType";
import { Card } from "./CardInterface";
import { CARD_POWERS } from "./CardPower";

const getCardPower = (card: Card) => {
    return CARD_POWERS[card.identifiant]
}

const createHand = async (player: User, game: Game, cards: Card[]) => {
    const newHand = DI.em.create(Hand, {
        cards: cards,
        owner: player,
        game: game,

    });

    await DI.em.persistAndFlush(newHand);

    if (game && newHand) {
        game.gameHands = [...game.gameHands, newHand];
    }

    // const user = await DI.userRepository.findOne({
    //     _id: player._id,
    // })

    // if (user && newHand) {
    //     user.userHands = [...user.userHands, newHand];
    //     console.log(user);
    //     await DI.em.persistAndFlush(user);


    // }

};

// creation de main pour chaque joueur
export const createHandForAllPlayers = (players: User[], game: Game, paquet: Card[]) => {
    const nbDeCarteParJoueur = paquet.length / players.length;
    let compteur = 0;
    for (let j = 0; j < players.length; j++) {

        let paquetJoueur: Card[] = [];
        if (j == 0) {
            paquetJoueur = paquet.slice(0, nbDeCarteParJoueur);
        } else {
            paquetJoueur = paquet.slice(compteur, compteur + nbDeCarteParJoueur);

        }

        createHand(players[j], game, paquetJoueur); //paquet -> liste de carte
        compteur += nbDeCarteParJoueur;

    }
}

export const addScore = (player: User) => {
    player.score++;
}

export const getHandbyCard = (card: Card, game: Game) => {
    for (let j = 0; j < game.gameHands.length; j++) {
        for (let i = 0; i + 1 < game.gameHands[j].cards.length; i++) {
            // console.log(game.gameHands[j].miseEnJeu[i]);
            // console.log(game.gameHands[j].miseEnJeu[i].identifiant === maxPower.identifiant && game.gameHands[j].miseEnJeu[i].symbole === maxPower.symbole)
            // console.log(maxPower);
            if (game.gameHands[j].cards[i].identifiant === card.identifiant && game.gameHands[j].cards[i].symbole === card.symbole) {
                return game.gameHands[j]
            }
        }
    }
}


export const fight = async (miseEnJeu: Card[], game: Game) => {
    //trouve la carte gagnante
    let maxPower: Card = miseEnJeu[0];
    for (let i = 1; i < miseEnJeu.length; i++) {
        if (getCardPower(miseEnJeu[i]) > getCardPower(maxPower)) {
            maxPower = miseEnJeu[i];
        }
    }
    for (let j = 0; j < game.gameHands.length; j++) {
        for (let i = 0; i + 1 < game.gameHands[j].cards.length; i++) {
            // console.log(game.gameHands[j].miseEnJeu[i]);
            // console.log(game.gameHands[j].miseEnJeu[i].identifiant === maxPower.identifiant && game.gameHands[j].miseEnJeu[i].symbole === maxPower.symbole)
            // console.log(maxPower);
            if (game.gameHands[j].cards[i].identifiant === maxPower.identifiant && game.gameHands[j].cards[i].symbole === maxPower.symbole) {
                game.gameHands[j].cards[i].isUsable = false;
                //addScore(game.gameHands[j].owner)
                const user = await DI.userRepository.findOne({
                    _id: game.gameHands[j].owner?._id
                })
                console.log(user);


                if (user) {
                    console.log({ score1: user.score });

                    user.score++;
                    console.log({ score2: user.score });

                    await DI.em.persistAndFlush(user);
                }
                return user?.score;

            }
        }
    }

}





export const chooseCard = (card: Card, miseEnjeu: Card[]) => {
    if (card.isUsable == true) {
        miseEnjeu.push(card);
        console.log(miseEnjeu);

    }
    else {
        console.log("La carte est non jouable");
    }
}

// export const bataille = () =>{
//     if()
// } 



export const jeu = async (game: Game) => {
    const scoreFin = 15;

    game.players[0].score != scoreFin;
    while (game.status != GameType.COMPLETED) {
        let miseEnJeu: Card[] = [];

        for (let i = 0; i < game.players.length; i++) {
            // envoie du front(joueur) la carte choisie
            //chooseCard(/*envoie de la socket*/, miseEnJeu);  
        }
        fight(miseEnJeu, game);

    }

}