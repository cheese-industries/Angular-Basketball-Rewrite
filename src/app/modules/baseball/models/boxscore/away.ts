import { Info } from "./info";
import { Note } from "./note";
import { Players } from "./players";
import { Team } from "./team";
import { TeamStats } from "./team-stats";

export interface Away {
    team: Team;
    teamStats: TeamStats;
    players: Players;
    batters: number[];
    pitchers: number[];
    bench: number[];
    bullpen: number[];
    battingOrder: number[];
    info: Info[];
    note: Note[];
}