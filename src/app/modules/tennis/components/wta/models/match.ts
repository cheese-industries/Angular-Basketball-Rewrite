import { PlayerOne } from "./player-one";
import { PlayerTwo } from "./player-two";

export interface Match {
    id: number;
    round: string;
    start: number;
    status: string;
    player_one: PlayerOne;
    player_two: PlayerTwo;
    loser_withdraw: string;
    loser_withdraw_reason: string;
    startForDisplay: string;
}