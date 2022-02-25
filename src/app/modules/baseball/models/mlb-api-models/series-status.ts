import { LosingTeam } from "./losing-team";
import { WinningTeam } from "./winning-team";

export interface SeriesStatus {
    gameNumber: number;
    totalGames: number;
    isTied: boolean;
    isOver: boolean;
    wins: number;
    losses: number;
    winningTeam: WinningTeam;
    losingTeam: LosingTeam;
    description: string;
    shortDescription: string;
    shortName: string;
}