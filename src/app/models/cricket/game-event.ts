import { Venue } from "./venue";
import { Competition } from "./competition";
import { Date } from "./date";
import { GameName } from "./game-name";
import { GameStatus } from "./game-status";
import { Id } from "./id";
import { Links } from "./links";
import { Series } from "./series";
import { Teams } from "./teams";

export interface GameEvent{
    competitions: Competition[];
    date: Date;
    id: Id;
    links: Links[];
    status: string;
    name: GameName;
    series: Series;
    ground: Venue;
    startDate: Date;
    teams: Teams[];
    statusText: string;
}