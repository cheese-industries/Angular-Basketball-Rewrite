import { LeagueRecord } from "./league-record";
import { ProbablePitcher } from "./probable-pitcher";
import { Team } from "./team";

export interface Home {
    isContextTeam: boolean;
    isFollowed: boolean;
    isFavorite: boolean;
    leagueRecord: LeagueRecord;
    score: number;
    team: Team;
    isWinner: boolean;
    probablePitcher: ProbablePitcher;
    splitSquad: boolean;
    seriesNumber: number;
}