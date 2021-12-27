import { Competition } from "./competition";
import { Date } from "./date";
import { GameName } from "./game-name";
import { GameStatus } from "./game-status";
import { Id } from "./id";
import { Links } from "./links";

export interface GameEvent{
    competitions: Competition[];
    date: Date;
    id: Id;
    links: Links[];
    status: GameStatus;
    name: GameName;
}