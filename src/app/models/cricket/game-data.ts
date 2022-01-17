import { Competition } from "./competition";
import { GameEvent } from "./game-event";
import { GameName } from "./game-name";
import { GameStatus } from "./game-status";
import { Id } from "./id";
import { Links } from "./links";
import { Leagues} from "./leagues";
import { ScoreboardContent } from "./scoreboard-content";


export interface GameData{
    leagues: Leagues[];
    length: number;
    events: GameEvent[];
    competitions: Competition[];
    date: Date;
    id: Id;
    links: Links[];
    status: GameStatus;
    name: GameName;
    content: ScoreboardContent;
    matches: GameEvent[];
}