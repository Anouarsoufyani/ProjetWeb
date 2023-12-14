import { User } from "./entities";
import { CardIdentifiers } from "./entities/CardType";

export interface Card {
    symbole: "Coeur" | "Trefle" | "Carreau" | "Pique",
    identifiant: CardIdentifiers,
    user: User,
    isUsable: boolean
}