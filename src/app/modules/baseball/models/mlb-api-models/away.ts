import { LeagueRecord2 } from "./league-record2";
import { ProbablePitcher2 } from "./probable-pitcher2";
import { Team2 } from "./team2";

export interface Away {
    isContextTeam: boolean;
    isFollowed: boolean;
    isFavorite: boolean;
    leagueRecord: LeagueRecord2;
    score: number;
    team: Team2;
    isWinner: boolean;
    probablePitcher: ProbablePitcher2;
    splitSquad: boolean;
    seriesNumber: number;
}