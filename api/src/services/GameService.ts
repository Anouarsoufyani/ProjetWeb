import { DI } from "../app";
import { Game, Hand, User } from "../entities";
import { GameType } from "../entities/GameType";
import { Card } from "./CardInterface";
import { CARD_POWERS } from "./CardPower";

const getCardPower = (card: Card) => {
    return CARD_POWERS[card.identifiant]
}

const createHand = async (player: User, game: Game, cards: Card[]) => {

    // const user = await DI.userRepository.findOne({
    //     _id: player._id,
    // })

    cards.forEach(card => {
        card.user = player
    });

    const newHand = DI.em.create(Hand, {
        cards: cards,
        owner: player,
        game: game,

    });

    await DI.em.persistAndFlush(newHand);

    if (game && newHand) {
        game.gameHands = [...game.gameHands, newHand];
    }

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

// export const getHandbyCard = (card: Card, game: Game) => {
//     for (let j = 0; j < game.gameHands.length; j++) {
//         for (let i = 0; i + 1 < game.gameHands[j].cards.length; i++) {
//             // console.log(game.gameHands[j].miseEnJeu[i]);
//             // console.log(game.gameHands[j].miseEnJeu[i].identifiant === maxPower.identifiant && game.gameHands[j].miseEnJeu[i].symbole === maxPower.symbole)
//             // console.log(maxPower);
//             if (game.gameHands[j].cards[i].identifiant === card.identifiant && game.gameHands[j].cards[i].symbole === card.symbole) {
//                 return game.gameHands[j]
//             }
//         }
//     }
// }


export const maxPuiss = (miseEnJeu : Card[]) => {
    let maxPower: Card = miseEnJeu[0];
    for (let i = 1; i < miseEnJeu.length; i++) {
        if (getCardPower(miseEnJeu[i]) > getCardPower(maxPower)) {
            maxPower = miseEnJeu[i];
        }
    }
    return maxPower;
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


const equivalentCard = (cards: Card[]) => {
    let eqCards: Card[] = [];
    cards.forEach(card => {
        // Vérifiez si une carte équivalente existe dans la liste
        if (cards.some(otherCard => otherCard.identifiant === card.identifiant && otherCard !== card)) {
            eqCards.push(card);
        }
    });
    return eqCards;
}

const joueurGagnant = async (cards: Card[], game : Game) => {
    const maxPower : Card = maxPuiss(cards);

    const jeu = await DI.gameRepository.findOne({
        code: game.code,
    })

    if (jeu) {
        jeu.players.forEach(async player => {
            if (player == maxPower.user) {
                player.score++;
                await DI.em.persistAndFlush(jeu)
            }
        });
    }
}

export const play = async (miseEnJeu: Card[], game: Game) => {
    let cartesEquivalentes : Card[] = equivalentCard(miseEnJeu);
    //SI CARTES EQ 
    if (cartesEquivalentes.length >= 2) {
        //BATAILLE
        let nouvellesCartesEnJeu : Card[] = [];
        let playersInBattle: User[] = [];
        cartesEquivalentes.forEach(card => {
            if (card.user != undefined) {
                playersInBattle.push(card.user)
            }
        playersInBattle.forEach(player => {
            chooseCard(/**/ ,nouvellesCartesEnJeu)
            play(nouvellesCartesEnJeu,game);
        });
        joueurGagnant(cartesEquivalentes, game)
        });

        //COMBAT ENTRE USER QUI ON DES CARTES EQ
        
    }else{
        //PAS BATAILLE, > GAGNE
        // const winner = joueurGagnant(miseEnJeu);
        // winner.score++;
    }
}

// export const bataille = async (game: Game, cartesEquivalentes : Card[]) =>{
//     const playersInBattle: User[] = [];
//     for (let k = 1; k < cartesEquivalentes.length; k++) {
//         for (let j = 0; j < game.gameHands.length; j++) {
//             for (let i = 0; i + 1 < game.gameHands[j].cards.length; i++) {
             
//                 if (game.gameHands[j].cards[i].identifiant === cartesEquivalentes[k].identifiant[i] && game.gameHands[j].cards[i].symbole === cartesEquivalentes[k].symbole) {
//                     game.gameHands[j].cards[i].isUsable = false;
//                     const user = await DI.userRepository.findOne({
//                         _id: game.gameHands[j].owner?._id
//                     })
    
//                     if (user) {
//                         playersInBattle.push(user)
    
//                     }
//                     return user?.score;
    
//                 }
//             }
//         }
//     }
// } 


// export const fight = async (miseEnJeu: Card[], game: Game) => {
//     //trouve la carte gagnante
//     const maxPower : Card = maxPuiss(miseEnJeu);
//     let cartesEquivalentes : Card[] = [maxPower];
//     miseEnJeu.forEach(async carte => {
//         if (maxPower == carte) {
//             cartesEquivalentes.push(carte);
//         }
//     });

//     if (cartesEquivalentes.length >= 2) {
//         const playersInBattle: User[] = [];
//             for (let k = 1; k < cartesEquivalentes.length; k++) {
//                 for (let j = 0; j < game.gameHands.length; j++) {
//                     for (let i = 0; i + 1 < game.gameHands[j].cards.length; i++) {
                    
//                         if (game.gameHands[j].cards[i].identifiant === cartesEquivalentes[k].identifiant[i] && game.gameHands[j].cards[i].symbole === cartesEquivalentes[k].symbole) {
//                             game.gameHands[j].cards[i].isUsable = false;
//                             const user = await DI.userRepository.findOne({
//                                 _id: game.gameHands[j].owner?._id
//                             })
            
//                             if (user) {
//                                 playersInBattle.push(user)
//                             }
//                             // renvoie de socket de chanque user dans playersInBattle de la carte qu'il veut jouer
//                             return user?.score;
            
//                         }
//                     }
//                 }
//             }
//     }else{
//         for (let j = 0; j < game.gameHands.length; j++) {
//             for (let i = 0; i + 1 < game.gameHands[j].cards.length; i++) {
//                 // console.log(game.gameHands[j].miseEnJeu[i]);
//                 // console.log(game.gameHands[j].miseEnJeu[i].identifiant === maxPower.identifiant && game.gameHands[j].miseEnJeu[i].symbole === maxPower.symbole)
//                 // console.log(maxPower);
//                 if (game.gameHands[j].cards[i].identifiant === maxPower.identifiant && game.gameHands[j].cards[i].symbole === maxPower.symbole) {
//                     game.gameHands[j].cards[i].isUsable = false;
//                     //addScore(game.gameHands[j].owner)
//                     const user = await DI.userRepository.findOne({
//                         _id: game.gameHands[j].owner?._id
//                     })
//                     console.log(user);
    
    
//                     if (user) {
//                         console.log({ score1: user.score });
    
//                         user.score++;
//                         console.log({ score2: user.score });
    
//                         await DI.em.persistAndFlush(user);
//                     }
//                     return user?.score;
    
//                 }
//             }
//         }
//     }
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
        // fight(miseEnJeu, game);

    }

}