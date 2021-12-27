import { GameDetail } from "./game-detail";
import { GameOver } from "./game-over";
import { ShortDetail } from "./short-detail";

export interface GameType{
    detail: GameDetail,
    completed: GameOver,
    shortDetail: ShortDetail
}