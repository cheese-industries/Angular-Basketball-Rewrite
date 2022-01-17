import { GameEvent } from "./game-event";
import { Leagues } from "./leagues";

export interface Scores{
    leagues: Leagues[];
    events: GameEvent[];
}