enum CardIdentifiers {
    AS = "AS",
    K = "K",
    Q = "Q",
    V = "V",
    DIX = "DIX",
    NEUF = "NEUF",
    HUIT = "HUIT",
    SEPT = "SEPT",
    SIX = "SIX",
    CINQ = "CINQ",
    QUATRE = "QUATRE",
    TROIS = "TROIS",
    DEUX = "DEUX"
}

export class Player {
    username: string;
    score: number;
    hand: Card[] = []

    constructor(username: string, score: number) {
        this.username = username;
        this.score = score;
    }

    getUsername = () => {
        return this.username;
    }

    addCard = (card: Card) => {
        this.hand.push(card);
    }

    getHand = () => {
        return this.hand;
    }
}

// interface Joueur {
//     username: PlayersName,
//     score: number
// }


interface Card {
    symbole: "Coeur" | "Trefle" | "Carreau" | "Pique",
    identifiant: CardIdentifiers,
}


const CARD_POWERS = {
    AS: 14,
    K: 13,
    Q: 12,
    V: 11,
    DIX: 10,
    NEUF: 9,
    HUIT: 8,
    SEPT: 7,
    SIX: 6,
    CINQ: 5,
    QUATRE: 4,
    TROIS: 3,
    DEUX: 2,
};


export class CardDeck {

    deck: Card[] = [];
    players: Player[] = [];

    static getCardPower = (card: Card) => {
        return CARD_POWERS[card.identifiant]
    }

    generationPaquet = () => {

        const paquet: Card[] = [];

        Object.keys(CARD_POWERS).forEach(identifier => {
            paquet.push({
                identifiant: identifier as CardIdentifiers,
                symbole: "Coeur"
            })
            paquet.push({
                identifiant: identifier as CardIdentifiers,
                symbole: "Carreau"
            })
            paquet.push({
                identifiant: identifier as CardIdentifiers,
                symbole: "Pique"
            })
            paquet.push({
                identifiant: identifier as CardIdentifiers,
                symbole: "Trefle"
            })
        })

        return paquet;
    }

    shuffleDeck = (paquet: Card[]) => {
        let currentIndex = paquet.length;
        while (currentIndex > 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [paquet[currentIndex], paquet[randomIndex]] = [paquet[randomIndex], paquet[currentIndex]];
        }

        return paquet;
    }

    getCard = (identifiant, symbole) => {
        for (let i = 0; i < this.deck.length; i++) {
            if (identifiant == this.deck[i].identifiant && symbole == this.deck[i].symbole) {
                return this.deck[i];
            }
        }
    }

    // getCardByIndex = (i: number) => {
    //     return this.deck[i];
    // }

    // removeCard = (identifiant, symbole) => {
    //     for (let i = 0; i < this.deck.length; i++) {
    //         if (identifiant == this.deck[i].identifiant && symbole == this.deck[i].symbole) {
    //             delete this.deck[i];
    //         }
    //     }
    // }

    removeCard = () => {
        this.deck.pop();
    }


    constructor() {
        this.deck = this.generationPaquet();
    }





}