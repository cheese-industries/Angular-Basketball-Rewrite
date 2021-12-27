import { Competition } from "./competition";
import { GameEvent } from "./game-event";
import { GameName } from "./game-name";
import { GameStatus } from "./game-status";
import { Id } from "./id";
import { Links } from "./links";

export interface GameData{
    events: GameEvent[];
    competitions: Competition[];
    date: Date;
    id: Id;
    links: Links[];
    status: GameStatus;
    name: GameName;
}