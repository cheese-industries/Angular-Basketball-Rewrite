import { LeagueRecord } from "./league-record";
import { Records } from "./records";

export interface Record {
    gamesPlayed: number;
    wildCardGamesBack: string;
    leagueGamesBack: string;
    springLeagueGamesBack: string;
    sportGamesBack: string;
    divisionGamesBack: string;
    conferenceGamesBack: string;
    leagueRecord: LeagueRecord;
    records: Records;
    divisionLeader: boolean;
    wins: number;
    losses: number;
    winningPercentage: string;
}
