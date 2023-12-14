import {
    Entity,
    // Collection,
    // OneToMany,
    ManyToOne,
    PrimaryKey,
    Property,
    // Unique,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Game } from "./Game";
import { User } from "./User";
import { CardIdentifiers } from "./CardType";

interface Card {
    symbole: "Coeur" | "Trefle" | "Carreau" | "Pique",
    identifiant: CardIdentifiers,
    user: User,
    isUsable: boolean
}

@Entity()
export class Hand {
    @PrimaryKey()
    _id: ObjectId | undefined;

    @Property({ type: "date" })
    createdAt = new Date();

    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property()
    cards!: Card[]

    @ManyToOne(() => User)
    owner: User | undefined;

    @ManyToOne(() => Game)
    game: Game | undefined;

}
