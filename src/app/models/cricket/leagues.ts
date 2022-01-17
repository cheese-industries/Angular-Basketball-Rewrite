import { LeagueId } from "./league-id";
import { LeagueName } from "./league-name";
import { Scores } from "./scores";

export interface Leagues{
    id: LeagueId;
    name: LeagueName;
    scores: Scores[];
}