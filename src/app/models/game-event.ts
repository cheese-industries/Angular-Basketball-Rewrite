import { Competition } from "./competition";
import { Date } from "./date";
import { GameStatus } from "./game-status";
import { Links } from "./links";

export interface GameEvent{
    competitions: Competition[];
    date: Date;
    links: Links[];
    status: GameStatus;
}