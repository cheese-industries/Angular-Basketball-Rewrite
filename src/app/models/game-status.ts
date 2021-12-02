import { GameClock } from "./game-clock";
import { GameType } from "./game-type";
import { Period } from "./period";

export interface GameStatus{
    displayClock: GameClock;
    period: Period;
    type: GameType
}