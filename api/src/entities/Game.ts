import {
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { User } from "./User";
import { GameType } from "./GameType";
import { Hand } from "./Hand";

@Entity()
export class Game {
  @PrimaryKey()
  _id: ObjectId | undefined;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  type!: string;

  @Enum({ default: GameType.UNSTARTED })
  status = GameType.UNSTARTED;

  @Property()
  @Unique()
  code!: string;

  @ManyToMany(() => User)
  players: User[] = [];

  @ManyToOne(() => User)
  owner: User | undefined;

  @OneToMany(() => Hand, (hand) => hand.game)
  gameHands: Hand[] = [];
}
