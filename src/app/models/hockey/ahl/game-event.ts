import { Team } from "../../team";
import { Venue } from "../../venue";
import { AwayEventResult } from "./away-event-result";
import { Competition } from "./competition";
import { Date } from "./date";
import { GameName } from "./game-name";
import { GameStatus } from "./game-status";
import { HomeEventResult } from "./home-event-result";
import { Id } from "./id";
import { Links } from "./links";

export interface GameEvent{
    competitions: Competition[];
    date: Date;
    id: Id;
    links: Links[];
    status: GameStatus;
    gameStatus: GameStatus;
    name: GameName;
    venue: Venue;
    homeEventResult: HomeEventResult;
    awayEventResult: AwayEventResult;
}