
import { CardIdentifiers } from "./CardType";

export interface Card {
    symbole: "Coeur" | "Trefle" | "Carreau" | "Pique",
    identifiant: CardIdentifiers,
    isUsable: boolean
}